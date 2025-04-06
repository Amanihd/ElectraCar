import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./CustomButton"; // Import CustomButton component

const ScrollableBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <CustomButton
          iconName="search"
          label="Search"
          onPress={() => console.log("Navigate to Search")}
        />
        <CustomButton
          iconName="options"
          label="All Filters"
          onPress={() => console.log("Apply Filter")}
        />
        <CustomButton
          iconName="checkmark-circle"
          label="Available"
          onPress={() => console.log("Navigate to available")}
        />
        <CustomButton
          iconName="battery-charging"
          label="2+ Chargers"
          onPress={() => console.log("Navigate to chargers")}
        />
        <CustomButton
          iconName="speedometer"
          label="Fast"
          onPress={() => console.log("Navigate to fast")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // Set background to white
    padding: 10,              // Optional: Add padding around the container
    width: '100%',
    paddingTop:20,
    paddingBottom:20,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    
  },
  viewContent: {
    flexDirection: "row",      // Align buttons horizontally
    flexWrap: "wrap",          // Wrap buttons to the next line if necessary
    justifyContent: "center",  // Center buttons horizontally
  },
});

export default ScrollableBar;
