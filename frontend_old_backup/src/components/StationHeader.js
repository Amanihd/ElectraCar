import React from "react";
import { View, Text, StyleSheet } from "react-native";


const StationHeader = ({ title, address }) => {
  
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text>{address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 200, // Position the header a little above the image
    padding: 20,
    backgroundColor: "white", // Change the background to white
    borderRadius: 15,
    width: "90%", // Ensure the header has some width for centering
    height: 120, // Increased height for more vertical space
    alignSelf: "center", // This will center the header horizontally
    shadowColor: "#000", // Shadow color (black)
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.1, // Adjust shadow opacity (lower value means less shadow)
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // Elevation for Android devices to show the shadow
    justifyContent: "center", // Center content vertically
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", // Make the text color black for better visibility
  },
});

export default StationHeader;