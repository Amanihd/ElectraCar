// components/LoadingScreen.js
import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const LoadingScreen = ({ errorMsg }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#000C66" />
    <Text>{errorMsg ? errorMsg : "Getting location..."}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
