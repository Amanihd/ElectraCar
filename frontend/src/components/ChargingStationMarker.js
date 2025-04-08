import React from "react";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChargingStationMarker = ({ station,userLocation}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ChargingStationDetails", { station,userLocation});
  };

  return (
    <Marker
      coordinate={{
        latitude: station.latitude,
        longitude: station.longitude,
      }}
      title={station.title}
      description={station.address}
      onPress={handlePress} // Add the onPress handler here
    >
      <Ionicons name="battery-charging" size={32} color="green" />
    </Marker>
  );
};

export default ChargingStationMarker;
