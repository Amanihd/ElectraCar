import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
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

import { useTranslation } from "react-i18next";

const TripsScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext);
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
  const [tripName, setTripName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Join");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading) {
    return null; // Don't render anything while loading
  }

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
      title: tripName.trim() || "Unnamed Trip",
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
    // Submit this tripData to backend

    try {
      navigation.navigate("TripMap", {
        start: { lat: 31.9815471, lng: 35.9434113 },
        streets: [
          //  { lat: 31.9634, lng: 35.9304 }, // Example start point in Amman
          { lat: 31.9824522, lng: 35.9412327 }, // Example middle point
        ],
        destination: { lat: 31.97, lng: 35.94 }, // Example destination in Amman
      });
    } catch (error) {
      console.error("Error fetching trip route:", error);
    }
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

        <Text style={styles.title}>{t("plan_your_trip")}</Text>
        <Text style={styles.subtitle}>{t("with_electracar")}</Text>
        <TextInput
          placeholder={t("trip_name_placeholder")}
          style={styles.input}
          value={tripName}
          onChangeText={setTripName}
        />

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
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
});

export default TripsScreen;
