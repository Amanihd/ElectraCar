import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import LottieView from "lottie-react-native";
import { UserLocationContext } from "../context/UserLocationContext";
import { VehicleContext } from "../context/VehicleContext";
import { BatteryContext } from "../context/BatteryContext";
import { AuthContext } from "../context/AuthContext";
import vehicleData from "../data/vehicles.json";

// Components
import TripInput from "../components/Trip/TripInput";
import PlanButton from "../components/Trip/PlanButton";
import VehicleConfirmModal from "../components/Trip/VehicleConfirmModal";
import BatteryLevelModal from "../components/Trip/BatteryLevelModal";
import BookmarkModal from "../components/Trip/BookmarkModal";

const TripsScreen = ({ route, navigation }) => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  const { userLocation } = useContext(UserLocationContext);
  const { selectedVehicle } = useContext(VehicleContext);
  const { batteryLevel, setBatteryLevel } = useContext(BatteryContext);
  const [start, setStart] = useState(route.params?.start || userLocation);
  const [destination, setDestination] = useState(
    route.params?.destination || null
  );
  const [modalStage, setModalStage] = useState(null);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("JoinScreen");
    }
  }, [isLoggedIn]);

  const vehicle = selectedVehicle || {
    id: 1,
    make: "Test Car",
    model: "X",
    trim: "Y",
  };

  const getVehicleMaxRange = (id) => {
    const v = vehicleData.find((v) => v.id === id);
    return v ? v.range_km : 0;
  };

  const handleSelectLocation = (type) => {
    navigation.navigate("SearchLocation", {
      type,
      start,
      destination,
    });
  };

  const handlePlanTrip = () => {
    setModalStage("vehicle");
  };

  const handleVehicleModalYes = () => {
    setModalStage("battery");
  };

  const handleVehicleModalNo = () => {
    setModalStage(null);
    navigation.navigate("VehiclePickScreen");
  };

  const handleBatteryContinue = () => {
    setModalStage(null);
    setShowBookmarkModal(true);
  };

  const handleSaveBookmark = (bookmarkChoice) => {
    setIsBookmark(bookmarkChoice);
    setShowBookmarkModal(false);

    const maxRange = getVehicleMaxRange(vehicle.id);
    const driveableDistance = (maxRange * batteryLevel) / 100;

    const tripData = {
      start: {
        lat: parseFloat(start.latitude || start.lat),
        lon: parseFloat(start.longitude || start.lon),
      },
      destination: {
        lat: parseFloat(destination.latitude || destination.lat),
        lon: parseFloat(destination.longitude || destination.lon),
      },
      selectedCar: {
        id: vehicle.id,
        make: vehicle.make,
        model: vehicle.model,
        trim: vehicle.trim,
      },
      maxRange,
      driveableDistance,
      isBookmark: bookmarkChoice,
    };

    console.log("Trip data to send:", tripData);
    // Submit tripData to backend here if needed
  };

  return (
    <>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/images/carTrip.json")}
          style={styles.animation}
          autoPlay
          loop
        />

        <Text style={styles.title}>Plan your trip easily</Text>
        <Text style={styles.subtitle}>with ElectraCar</Text>

        <TripInput
          label="📍"
          value={start?.display_name}
          onPress={() => handleSelectLocation("start")}
        />

        <TripInput
          label="🏁"
          value={destination?.display_name}
          onPress={() => handleSelectLocation("destination")}
        />

        <PlanButton
          disabled={!start || !destination}
          onPress={handlePlanTrip}
        />
      </View>

      <VehicleConfirmModal
        visible={modalStage === "vehicle"}
        vehicle={vehicle}
        onYes={handleVehicleModalYes}
        onNo={handleVehicleModalNo}
      />

      <BatteryLevelModal
        visible={modalStage === "battery"}
        batteryLevel={batteryLevel}
        onValueChange={setBatteryLevel}
        onContinue={handleBatteryContinue}
      />

      <BookmarkModal visible={showBookmarkModal} onSave={handleSaveBookmark} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
  },
  animation: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000C66",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
});

export default TripsScreen;
