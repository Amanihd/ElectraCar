import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import polyline from "@mapbox/polyline";

const decodePolyline = (encoded) => {
  const points = polyline.decode(encoded);
  return points.map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  }));
};

const fetchRoute = async (start, end) => {
  const apiKey = "5b3ce3597851110001cf62482a8efc0d76304656ad6058c5dc8f9864";
  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  try {
    const response = await axios.post(
      url,
      {
        coordinates: [
          [start.longitude, start.latitude],
          [end.longitude, end.latitude],
        ],
      },
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    const route = response.data.routes[0];
    const coords = decodePolyline(route.geometry);
    const summary = route.summary;

    return {
      coords,
      duration: summary.duration, // seconds
      distance: summary.distance, // meters
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Retrying after delay...");
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
      return await fetchRoute(start, end); // Retry the request
    }

    console.error("Failed to fetch route:", error);
    return { coords: [], duration: 0, distance: 0 };
  }
};

const DirectionsScreen = ({ route }) => {
  const { station } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [summary, setSummary] = useState({ duration: 0, distance: 0 });
  const mapRef = useRef(null);
  const lastLocationRef = useRef(null);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const stationCoords = {
    latitude: station.AddressInfo.Latitude,
    longitude: station.AddressInfo.Longitude,
  };

  const loadRoute = async (from) => {
    const { coords, duration, distance } = await fetchRoute(from, stationCoords);
    setRouteCoords(coords);
    setSummary({ duration, distance });
  };

  const handleLocationUpdate = async (newLocation) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(async () => {
      const { latitude, longitude } = newLocation.coords;
      const current = { latitude, longitude };
      setUserLocation(current);
      await loadRoute(current);
    }, 1000); // Delay of 1 second

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    let subscription;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      const coords = initialLocation.coords;
      setUserLocation(coords);
      lastLocationRef.current = coords;
      await loadRoute(coords);

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        handleLocationUpdate
      );
    };

    startTracking();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  const minutes = Math.round(summary.duration / 60);
  const km = (summary.distance / 1000).toFixed(1);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: stationCoords.latitude,
          longitude: stationCoords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="You are here" pinColor="blue" />
        )}
        <Marker coordinate={stationCoords} title={station.AddressInfo.Title} />
        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeColor="blue" strokeWidth={4} />
        )}
      </MapView>

      {/* 🚗 Trip Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>🕒 {minutes} mins | 📍 {km} km</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "70%" },
  summaryBox: {
    backgroundColor: "#fff",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DirectionsScreen;
