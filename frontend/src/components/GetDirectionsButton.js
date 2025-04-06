import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const GetDirectionsButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, styles.buttonMargin]} onPress={onPress}>
      <Text style={styles.buttonText}>Get Directions</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%", 
    height: 50,
    alignSelf: "center",
    backgroundColor: "#003366", // Dark blue color
    paddingVertical: 15,
    borderRadius: 10, // Rounded corners
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonMargin: {
    marginTop: 90, // Adjust this to push it further down
  },
});

export default GetDirectionsButton;
