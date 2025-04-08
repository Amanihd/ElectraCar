import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingComponent = ({ errorMsg }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#000C66" />
      <Text>{errorMsg ? errorMsg : "Getting your location..."}</Text>
    </View>
  );
};

export default LoadingComponent;
