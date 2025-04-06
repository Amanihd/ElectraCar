import React from "react";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChargingStationMarker = ({ station }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ChargingStationDetails", { station });
  };

  return (
    <Marker
      coordinate={{
        latitude: station.AddressInfo.Latitude,
        longitude: station.AddressInfo.Longitude,
      }}
      title={station.AddressInfo.Title}
      description={station.AddressInfo.AddressLine1}
      onPress={handlePress} // Add the onPress handler here
    >
      <Ionicons name="battery-charging" size={32} color="green" />
    </Marker>
  );
};

export default ChargingStationMarker;
