import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const TripInput = ({ label, value, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.input}>
    <Text style={styles.emoji}>{label}</Text>
    <Text style={styles.text}>{value || "Select location"}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  emoji: {
    fontSize: 18,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default TripInput;
