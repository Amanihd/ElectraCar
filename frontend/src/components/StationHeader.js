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
    top: 200, 
    padding: 20,
    backgroundColor: "white", 
    borderRadius: 15,
    width: "90%", 
    height: 120,
    alignSelf: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 5,
    elevation: 5,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black", 
  },
});

export default StationHeader;