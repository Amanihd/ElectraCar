import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomBar from "../components/BottomBar";
import MainMap from "../components/MainMap";

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [filterTypes, setFilterTypes] = useState([]); // NEW

  return (
    <View style={styles.container}>
      <MainMap getlocation={setUserLocation} filterTypes={filterTypes} />
      <View style={styles.barContainer}>
        <BottomBar
          userLocation={userLocation}
          navigation={navigation}
          setFilterTypes={setFilterTypes}
          filterTypes={filterTypes}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  barContainer: {
    position: "absolute",
    bottom: -5,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
