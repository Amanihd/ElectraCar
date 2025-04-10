import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";

const CustomButton = ({ iconName, label, onPress, selected }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selected && styles.selectedButton]} // Apply selected style
        onPress={onPress}
      >
        <Ionicons name={iconName} size={25} color="#000C66" />
      </TouchableOpacity>
      <Text style={[styles.buttonText, selected && styles.selectedText]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
    marginRight: 17,
    marginBottom: 5,

    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.25, // Opacity of the shadow
    shadowRadius: 5, // Radius of the shadow blur

    // Shadow for Android
    elevation: 5, // Elevation for Android devices
  },
  selectedButton: {
    backgroundColor: "#e7ebf7", // Light blue color when selected
  },
  buttonText: {
    color: "gray",
    fontSize: 12,
    marginRight: 17,
  },
  selectedText: {
    fontWeight: "bold",
  },
});

export default CustomButton;
