import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import MapComponent from "../components/StationDirection/MapComponent";
import InfoComponent from "../components/StationDirection/InfoComponent";
import LoadingComponent from "../components/StationDirection/LoadingComponent";
import * as Location from "expo-location";

const DirectionsScreen = ({ route }) => {
  const { station, userLocation } = route.params;
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ distance: 0, duration: 0 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [locationSubscription, setLocationSubscription] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    };

    requestLocationPermission();

    let subscription = null;

    if (isTracking) {
      // Start tracking the user's location
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (location) => {
          setCurrentLocation(location.coords);
        }
      )
        .then((sub) => {
          setLocationSubscription(sub); // Store the subscription
        })
        .catch((error) => {
          console.error("Error starting location watch:", error);
        });
    } else {
      // Stop tracking if already tracking
      if (locationSubscription && locationSubscription.remove) {
        locationSubscription.remove(); // Remove the subscription when tracking stops
      }
    }

    return () => {
      if (locationSubscription && locationSubscription.remove) {
        locationSubscription.remove(); // Cleanup subscription on component unmount
      }
    };
  }, [isTracking]);

  useEffect(() => {
    if (currentLocation) {
      const getDirections = async () => {
        try {
          const response = await axios.get(
            `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482a8efc0d76304656ad6058c5dc8f9864`,
            {
              params: {
                start: `${currentLocation.longitude},${currentLocation.latitude}`,
                end: `${station.longitude},${station.latitude}`,
              },
            }
          );

          if (response.data.features && response.data.features.length > 0) {
            const directions = response.data.features[0].geometry.coordinates;
            if (directions) {
              const coordinates = directions.map((coord) => ({
                latitude: coord[1],
                longitude: coord[0],
              }));

              // Include the end location (charging station) in the coordinates
              coordinates.push({
                latitude: station.latitude,
                longitude: station.longitude,
              });

              setRouteCoordinates(coordinates);

              // Extract distance and duration from the response
              const distance =
                response.data.features[0].properties.segments[0].distance /
                1000; // Convert meters to kilometers
              const duration =
                response.data.features[0].properties.segments[0].duration / 60; // Convert seconds to minutes
              setRouteInfo({
                distance: distance.toFixed(2), // Keep 2 decimal points
                duration: duration.toFixed(0), // Round to nearest minute
              });
            } else {
              console.error("No coordinates found in the directions.");
            }
          } else {
            console.error("Invalid API response or no route found.");
          }
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      };

      getDirections();
    }
  }, [currentLocation, station]);

  const toggleTracking = () => {
    setIsTracking((prev) => !prev); // Toggle tracking state
  };

  if (!currentLocation) {
    return <LoadingComponent errorMsg={errorMsg} />;
  }

  return (
    <View style={[styles.container, isTracking && styles.stopButton]}>
      <TouchableOpacity
        // Change button style based on isTracking
        onPress={toggleTracking}
      >
        <Text style={styles.buttonText}>
          {isTracking ? "Stop Tracking..." : "Start Tracking"}
        </Text>
      </TouchableOpacity>
      <MapComponent
        userLocation={currentLocation}
        station={station}
        routeCoordinates={routeCoordinates}
      />
      <InfoComponent routeInfo={routeInfo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
  },
  stopButton: {
    backgroundColor: "#ff6347", // Change color when tracking
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    paddingBottom: 10,
  },
});

export default DirectionsScreen;
