import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import MapComponent from "../components/StationDirection/MapComponent";
import InfoComponent from "../components/StationDirection/InfoComponent";
import LoadingComponent from "../components/StationDirection/LoadingComponent";
import TrackingButton from "../components/StationDirection/TrackingButton"; 
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

    if (isTracking) {
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (location) => {
          setCurrentLocation(location.coords);
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

              coordinates.push({
                latitude: station.latitude,
                longitude: station.longitude,
              });

              setRouteCoordinates(coordinates);

              const distance =
                response.data.features[0].properties.segments[0].distance /
                1000;
              const duration =
                response.data.features[0].properties.segments[0].duration / 60;

              setRouteInfo({
                distance: distance.toFixed(2),
                duration: duration.toFixed(0),
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
    setIsTracking((prev) => !prev);
  };

  if (!currentLocation) {
    return <LoadingComponent errorMsg={errorMsg} />;
  }

  return (
    <View>
      <TrackingButton isTracking={isTracking} onPress={toggleTracking} />
      <MapComponent
        userLocation={currentLocation}
        station={station}
        routeCoordinates={routeCoordinates}
        isStation={true}
      />
      <InfoComponent routeInfo={routeInfo} />
    </View>
  );
};

export default DirectionsScreen;
