import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StationHeader from "../components/StationHeader";
import { useBookmarks } from "../context/BookmarksContext";
import SectionDetail from "../components/SectionDetail";
import GetDirectionsButton from "../components/GetDirectionsButton"; // Import the new button component

const ChargingStationDetails = ({ route, navigation }) => {
  const { addBookmark } = useBookmarks();
  const station = route?.params?.station;

  if (!station) {
    return (
      <View>
        <Text>No station data available.</Text>
      </View>
    );
  }

  // Save function
  const handleSave = () => {
    addBookmark(station);
  };

  // Get Directions function
  const handleGetDirections = () => {
    if (!station) return;
    navigation.navigate("DirectionsScreen", { station });
  };

  return (
    <View style={{ flex: 1 }}>
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

      {/* Pass handleSave to the StationHeader */}
      <StationHeader
        title={station.AddressInfo.Title}
        address={station.AddressInfo.AddressLine1}
        onSave={handleSave}
      />

      {/* Use the GetDirectionsButton component */}
      <GetDirectionsButton onPress={handleGetDirections} />

      {/* Wrap SectionDetails with a View and add margin */}
      <View style={styles.detailsWrapper}>
        <SectionDetail
          title="Plug Type"
          content={station.Connections[0]?.ConnectionType?.Title}
        />
        <SectionDetail title="Cost" content={station.UsageCost} />
        <SectionDetail
          title="Parking"
          content={station.AddressInfo.AccessComments}
        />
        <SectionDetail title="Amenities" content={station.Amenities} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: { position: "relative" },
  stationImage: { width: "100%", height: 250, resizeMode: "cover" },
  backButton: { position: "absolute", top: 30, left: 15, zIndex: 1 },
  detailsWrapper: {
    marginTop: 50, // Adjust this value to move the details down as needed
  },
});

export default ChargingStationDetails;
