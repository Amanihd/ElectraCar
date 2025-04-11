import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";

const MapComponent = ({ userLocation, station, routeCoordinates }) => {
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }} // Dynamically update region based on user's location
      showsUserLocation={true} // Show user's location on the map
      followsUserLocation={true} // Follow user's location
    >
      {/* User's current location */}
      <Marker coordinate={userLocation} title="Your Location">
        <Ionicons name="location-sharp" size={30} color="blue" />
      </Marker>

      {/* Charging station location */}
      <Marker
        coordinate={{
          latitude: station.latitude,
          longitude: station.longitude,
        }}
        title={station.title}
      >
         <FontAwesome5 name="charging-station" size={20} color="#00A86B" />
      </Marker>

      {/* Directions (Polyline) */}
      {routeCoordinates.length > 0 && (
        <Polyline
          coordinates={routeCoordinates}
          strokeColor="blue"
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};

export default MapComponent;
