import React from "react";
import { View, StyleSheet } from "react-native";
import BottomBar from "../components/BottomBar";
import MainMap from "../components/MainMap";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MainMap />

      {/* Scrollable Bar Positioned Above Bottom Navigation */}
      <View style={styles.barContainer}>
        <BottomBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Ensures proper positioning of absolute elements
  },
  barContainer: {
    position: "absolute",
    bottom: -5, // Adjust this value based on your Bottom Navigation height
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
