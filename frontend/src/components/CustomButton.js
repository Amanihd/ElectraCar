import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";

const CustomButton = ({ iconName, label, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Ionicons name={iconName} size={25} color="#000C66" />
      </TouchableOpacity>
      <Text style={styles.buttonText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", // Center the button and the label together
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 50, // Set width to make the button circular
    height: 50, // Set height to make the button circular
    borderRadius: 35, // Half of width/height for a perfect circle
    marginRight: 17,
    marginBottom: 5, // Adds some space between the button and the label

    // Shadow properties for iOS
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.25,  // Opacity of the shadow
    shadowRadius: 5,      // Radius of the shadow blur

    // Shadow for Android
    elevation: 5,         // Elevation for Android devices
  },
  buttonText: {
    color: "gray",
    fontSize: 12, // Smaller font size for the label
    marginRight: 17,
  },
});

export default CustomButton;
