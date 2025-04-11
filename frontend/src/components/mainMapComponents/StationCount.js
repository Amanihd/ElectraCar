import React from "react";
import { Text, StyleSheet } from "react-native";

const StationCount = ({ count }) => {
  return (
    <Text style={styles.stationCount}>
      {count} station{count !== 1 ? "s" : ""} found
    </Text>
  );
};

const styles = StyleSheet.create({
  stationCount: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 14,
    zIndex: 1,
  },
});

export default StationCount;
