import React from "react";
import { Marker } from "react-native-maps";
import { FontAwesome5 } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChargingStationMarker = ({ station, userLocation }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("ChargingStationDetails", { station, userLocation });
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
      <FontAwesome5 name="charging-station" size={20} color="#00A86B" />
    </Marker>
  );
};

export default ChargingStationMarker;
