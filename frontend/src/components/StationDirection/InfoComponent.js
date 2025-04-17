import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InfoComponent = ({ routeInfo }) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <Ionicons name="location-sharp" size={20} color="#E63946" />
        <Text style={styles.infoText}>Distance: {routeInfo.distance} km</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="car-sport" size={20} color="#1D3557" />
        <Text style={styles.infoText}>Time: {routeInfo.duration} mins</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#F8F9FA",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    color: "#343A40",
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default InfoComponent;
