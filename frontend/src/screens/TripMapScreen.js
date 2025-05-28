import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import MapComponent from "../components/StationDirection/MapComponent";
import InfoComponent from "../components/StationDirection/InfoComponent";
import TrackingButton from "../components/StationDirection/TrackingButton";

const TripMapScreen = ({ route }) => {
  const normalizeCoord = (coord) => ({
    lat: parseFloat(coord.lat),
    lng: parseFloat(coord.lng !== undefined ? coord.lng : coord.lon),
  });
  const fixedStart = normalizeCoord(route.params.start);
  const fixedDestination = normalizeCoord(route.params.destination);
  const fixedStreets = route.params.streets.map(normalizeCoord);
  const { totalDistanceKm, estimatedTimeMinutes } = route.params;

  const [currentLocation, setCurrentLocation] = useState({
    latitude: fixedStart.lat,
    longitude: fixedStart.lng,
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
   

    
    const fullRoute = [
      [startLoc.longitude, startLoc.latitude],
      ...fixedStreets.map((p) => [p.lng, p.lat]),
      [fixedDestination.lng, fixedDestination.lat],
    ];

    const pickStartAndEndPoints = (points, count = 10) => {
      if (points.length <= count * 2) return points;

      const startPoints = points.slice(0, count);
      const endPoints = points.slice(points.length - count);

      return [...startPoints, ...endPoints];
    };

    const reducedRoute = pickStartAndEndPoints(fullRoute, 5);

    const hasInvalidCoords = reducedRoute.some(
      ([lng, lat]) =>
        typeof lng !== "number" ||
        typeof lat !== "number" ||
        isNaN(lng) ||
        isNaN(lat)
    );

    if (hasInvalidCoords) {
      console.error("❌ Invalid coordinates:", reducedRoute);
      return;
    }

    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        {
          coordinates: reducedRoute,
        },
        {
          headers: {
            Authorization:
              "5b3ce3597851110001cf62482a8efc0d76304656ad6058c5dc8f9864",
            "Content-Type": "application/json",
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates.map((c) => ({
        latitude: c[1],
        longitude: c[0],
      }));

      setRouteCoords(coords);

      setRouteInfo({
        distance: totalDistanceKm.toFixed(2),
        duration: estimatedTimeMinutes.toFixed(0),
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
            latitude: fixedDestination.lat,
            longitude: fixedDestination.lng,
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
