import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ResetLocationButton from "./MapControls/ResetLocationButton";
import ZoomOutButton from "./MapControls/ZoomOutButton";
import ChargingStationMarker from "./ChargingStationMarker";
import { useNavigation } from "@react-navigation/native";

const MainMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(0.01);

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

      fetchChargingStations(
        location.coords.latitude,
        location.coords.longitude
      );
    };

    getLocation();
  }, []);

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

  const zoomOut = () => {
    if (mapRef) {
      const newZoomLevel = zoomLevel + 0.05;
      setZoomLevel(newZoomLevel);

      mapRef.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: newZoomLevel,
        longitudeDelta: newZoomLevel,
      });
    }
  };

  const fetchChargingStations = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=${latitude}&longitude=${longitude}&maxresults=10&key=a164f27a-d27a-456a-a7fe-0fd483025c3f`
      );
      const data = await response.json();
      setChargingStations(data);
    } catch (error) {
      console.error("Error fetching charging stations:", error);
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

        {chargingStations.map((station, index) => (
          <ChargingStationMarker key={index} station={station} />
        ))}
      </MapView>

      <ResetLocationButton onPress={resetMapToUserLocation} />
      <ZoomOutButton onPress={zoomOut} />
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
