import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ResetLocationButton from "./MapControls/ResetLocationButton";
import ChargingStationMarker from "./ChargingStationMarker";

import chargingStationsData from "../data/stations.json";

const MainMap = ({ getlocation, filterTypes }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);

  useEffect(() => {
    console.log("Filter type changed:", filterTypes);
  }, [filterTypes]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      getlocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // Use local charging station data
      setChargingStations(chargingStationsData);
    };

    getLocation();
  }, []);

  // NEW: Apply filter logic
  const filteredStations = chargingStations.filter((station) => {
  if (filterTypes.length === 0) {
    return true; // No filter is applied, show all stations
  }

  // Otherwise, apply the filters
  return filterTypes.some((filter) => {
    if (filter === "available" && station.isAvailable) return true;
    if (filter === "2plus" && station.numConnections >= 2) return true;
    if (filter === "fast" && station.isFast) return true;
    return false;
  });
});

  const resetMapToUserLocation = async () => {
    if (userLocation && mapRef) {
      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000C66" />
        <Text>{errorMsg ? errorMsg : "Getting location..."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={(ref) => setMapRef(ref)}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {userLocation && <Marker coordinate={userLocation} pinColor="blue" />}

        {filteredStations.map((station, index) => (
          <ChargingStationMarker
            key={index}
            station={station}
            userLocation={userLocation}
          />
        ))}
      </MapView>

      <ResetLocationButton onPress={resetMapToUserLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainMap;
