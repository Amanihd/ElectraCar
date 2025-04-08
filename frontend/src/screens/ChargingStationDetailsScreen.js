import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StationHeader from "../components/StationHeader";
import SectionDetail from "../components/SectionDetail";
import GetDirectionsButton from "../components/GetDirectionsButton"; // Import the new button component

const ChargingStationDetails = ({ route, navigation }) => {
  const station = route?.params?.station;
  const userLocation=route?.params?.userLocation;
  if (!station) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No station data available.</Text>
      </View>
    );
  }

  // Get Directions function
  const handleGetDirections = () => {
    if (!station) return;
    navigation.navigate("DirectionsScreen", { station,userLocation });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header and Image Section */}
      <View style={styles.imageContainer}>
        <Ionicons
          name="arrow-back"
          size={25}
          color="white"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
        <Image
          source={require("../../assets/images/charging_station.jpg")}
          style={styles.stationImage}
        />
      </View>

      {/* Station Header */}
      <StationHeader
        title={station.title}
        address={station.address}
      />

      {/* Directions Button */}
      <GetDirectionsButton onPress={handleGetDirections} />

      {/* Details Section */}
      <View style={styles.detailsWrapper}>
        {/* Plug Type - Display the first plug type */}
        <SectionDetail
          title="Plug Type"
          content={station.plugType[0] || "N/A"}
        />
        
        {/* Cost */}
        <SectionDetail
          title="Cost"
          content={station.cost ? `$${station.cost}` : "N/A"}
        />

        {/* Parking */}
        <SectionDetail
          title="Parking"
          content={station.parking ? `${station.parking} spots` : "No parking info"}
        />

        {/* Amenities - Display as a list or 'N/A' if empty */}
        <SectionDetail
          title="Amenities"
          content={station.amenities.length > 0 ? station.amenities.join(", ") : "No amenities listed"}
        />

        {/* Plug Score (if available) */}
        <SectionDetail
          title="Plug Score"
          content={station.plugScore ? station.plugScore : "N/A"}
        />

        {/* Is Fast Charging */}
        <SectionDetail
          title="Fast Charging"
          content={station.isFast ? "Yes" : "No"}
        />

        {/* Availability */}
        <SectionDetail
          title="Availability"
          content={station.isAvailable ? "Available" : "Not available"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
  },
  stationImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    zIndex: 1,
  },
  detailsWrapper: {
    marginTop: 50, // Adjust this value to move the details down as needed
    paddingHorizontal: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ChargingStationDetails;
