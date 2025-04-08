import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoComponent = ({ routeInfo }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Ionicons name="location-sharp" size={24} color="red" />
        <Text style={styles.infoText}>Distance: {routeInfo.distance} km</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="car-sport" size={24} color="black" />
        <Text style={styles.infoText}>Time: {routeInfo.duration} mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    color: "black",
    fontSize: 16,
    marginLeft: 8,
  },
});

export default InfoComponent;
