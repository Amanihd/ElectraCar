import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import ResetLocationButton from "./mainMapComponents/ResetLocationButton";
import ChargingStationMarker from "./mainMapComponents/ChargingStationMarker";

import chargingStationsData from "../data/stations.json";
import StationCount from "./mainMapComponents/StationCount";
import LoadingScreen from "./StationDirection/LoadingComponent";
import useFilteredStations from "../hooks/useFilteredStations";

const MainMap = ({ getlocation, filterTypes }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [chargingStations, setChargingStations] = useState([]);
  const filteredStations = useFilteredStations(chargingStations, filterTypes);


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
    return <LoadingScreen errorMsg={errorMsg} />;
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
      <StationCount count={filteredStations.length} />

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
});

export default MainMap;
