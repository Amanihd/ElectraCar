import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import MapComponent from "../components/StationDirection/MapComponent";
import InfoComponent from "../components/StationDirection/InfoComponent";
import TrackingButton from "../components/StationDirection/TrackingButton";

const TripMapScreen = ({ route }) => {
  const { start, streets, destination } = route.params;
  const [currentLocation, setCurrentLocation] = useState({
    latitude: start.lat,
    longitude: start.lng,
  });  
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ distance: "", duration: "" });
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
    };
    requestLocationPermission();

    if (isTracking) {
      let subscription = null;
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (location) => {
          const { latitude, longitude } = location.coords;
          const curr = { latitude, longitude };
          setCurrentLocation(curr);
          fetchRoute(curr);
        }
      )
        .then((sub) => {
          setLocationSubscription(sub);
        })
        .catch((error) => {
          console.error("Error starting location watch:", error);
        });
    } else {
      if (locationSubscription && locationSubscription.remove) {
        locationSubscription.remove();
      }
    }

    return () => {
      if (locationSubscription && locationSubscription.remove) {
        locationSubscription.remove();
      }
    };
  }, [isTracking]);

  useEffect(() => {
    if (currentLocation) {
      fetchRoute(currentLocation);
    }
  }, [currentLocation]);

  const fetchRoute = async (startLoc) => {
    const allPoints = [
      [startLoc.longitude, startLoc.latitude],
      ...streets.map((p) => [p.lng, p.lat]),
      [destination.lng, destination.lat],
    ];

    const hasInvalidCoords = allPoints.some(
      ([lng, lat]) =>
        typeof lng !== "number" || typeof lat !== "number" || isNaN(lng) || isNaN(lat)
    );

    if (hasInvalidCoords) {
      console.error("❌ Invalid coordinates:", allPoints);
      return;
    }

    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates: allPoints,
        },
        {
          headers: {
            Authorization: "5b3ce3597851110001cf62482a8efc0d76304656ad6058c5dc8f9864",
            "Content-Type": "application/json",
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates.map((c) => ({
        latitude: c[1],
        longitude: c[0],
      }));

      const segment = res.data.features[0].properties.segments[0];

      setRouteCoords(coords);
      const distance = segment.distance / 1000;
      const duration = segment.duration / 60;
      const bufferedDuration = duration * 1.3;

      setRouteInfo({
        distance: distance.toFixed(2),
        duration: bufferedDuration.toFixed(0),
      });
    } catch (err) {
      console.error("Error fetching route:", err);
    }
  };

  const toggleTracking = () => {
    setIsTracking((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <TrackingButton isTracking={isTracking} onPress={toggleTracking} />
      {currentLocation && (
        <MapComponent
          userLocation={currentLocation}
          station={{
            latitude: destination.lat,
            longitude: destination.lng,
            title: "Destination",
          }}
          routeCoordinates={routeCoords}
          isStation={false}
        />
      )}
      <InfoComponent routeInfo={routeInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TripMapScreen;
