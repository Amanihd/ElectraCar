import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
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
import i18next from "../services/i18next";
import { TripContext } from "../context/TripContext";
import BatteryWarningModal from "../components/Trip/BatteryWarningModal";
import axios from "axios";

const TripsScreen = ({ route, navigation }) => {
  const {
    tripName,
    setTripName,
    start,
    setStart,
    destination,
    setDestination,
  } = useContext(TripContext);

  const { t } = useTranslation();
  const { isLoggedIn, token } = useContext(AuthContext);
  const { userLocation } = useContext(UserLocationContext);
  const { selectedVehicle } = useContext(VehicleContext);
  const { batteryLevel, setBatteryLevel } = useContext(BatteryContext);

  const [modalStage, setModalStage] = useState(null);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const [loading, setLoading] = useState(true);
  const [showBatteryWarningModal, setShowBatteryWarningModal] = useState(false);

  const isRTL = i18next.language === "ar";

  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

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
    id: 0,
    make: t("no_car_selected"),
    model: "",
    trim: "",
  };

  const getVehicleMaxRange = (id) => {
    const v = vehicleData.find((v) => v.id === id);
    return v ? v.range_km : 0;
  };

  const handleReset = () => {
    setTripName("");
    setStart(userLocation);
    setDestination(null);
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
    console.log("Navigating to VehiclePickScreen from modal");
    navigation.navigate("VehiclePickScreen", { fromVehicleModal: true });
  };

  const handleBatteryContinue = () => {
    setModalStage(null);
    setShowBookmarkModal(true);
  };

  const handleSaveBookmark = async (bookmarkChoice) => {
    setIsBookmark(bookmarkChoice);
    setShowBookmarkModal(false);

    const maxRange = getVehicleMaxRange(vehicle.id);
    const driveableDistance = (maxRange * batteryLevel) / 100;

    const startCoords = {
      lat: parseFloat(start.latitude || start.lat),
      lon: parseFloat(start.longitude || start.lon),
    };

    const destCoords = {
      lat: parseFloat(destination.latitude || destination.lat),
      lon: parseFloat(destination.longitude || destination.lon),
    };

    const requestBody = {
      sourceLat: Number(startCoords.lat),
      sourceLon: Number(startCoords.lon),
      destinationLat: Number(destCoords.lat),
      destinationLon: Number(destCoords.lon),
      initialChargeDistanceKm: Number(driveableDistance),
      maxDriveKm: Number(maxRange),
      bookmarked: Boolean(bookmarkChoice), // convert to real boolean
      ...(bookmarkChoice ? { bookmarkName: tripName } : {}),
    };

    console.log("start:", start);
    console.log("destination:", destination);
    console.log("vehicle:", vehicle);
    console.log("batteryLevel:", batteryLevel);
    console.log("token:", token);

    console.log("Sending request:", requestBody);
    console.log("📦 Payload to send:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await axios.post(
        "https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/path/find",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("✅ Response data:", response.data);

      if (response.status === 300) {
        setShowBatteryWarningModal(true);
        return;
      }

      const { path, totalDistanceKm, estimatedTimeMinutes } = response.data;

      if (!Array.isArray(path) || path.length < 2) {
        console.error("❌ Invalid path received:", path);
        return;
      }

      // Convert to { lat, lng }
      const convertedPath = path.map((p) => ({
        lat: p.lat,
        lng: p.lon,
      }));

      const tripStart = convertedPath[0];
      console.log("Trip start:", tripStart);

      const tripDestination = convertedPath[convertedPath.length - 1];
      console.log("Trip destination:", tripDestination);

      const streets = convertedPath.slice(1, -1); // middle points only
      console.log("Streets (middle points):", streets);

      navigation.navigate("TripMap", {
        start: tripStart,
        streets,
        destination: tripDestination,
        totalDistanceKm,
        estimatedTimeMinutes,
      });
    } catch (error) {
      console.error("❌ Full Axios error response:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }

    console.log("🔴 Error details:", error.response?.data || error.message);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 16 }}>{t("loading")}...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <LottieView
          source={require("../../assets/images/carTrip.json")}
          style={styles.animation}
          autoPlay
          loop
        />

        <Text style={[styles.title, arFontFamilySmiBold]}>
          {t("plan_your_trip")}
        </Text>
        <Text style={[styles.subtitle, arFontFamilySmiBold]}>
          {t("with_electracar")}
        </Text>
        <TextInput
          placeholder={t("trip_name_placeholder")}
          style={[styles.input, arFontFamilySmiBold]}
          value={tripName || ""}
          onChangeText={setTripName}
        />

        <TripInput
          label="📍"
          value={start?.display_name || ""}
          onPress={() => handleSelectLocation("start")}
        />

        <TripInput
          label="🏁"
          value={destination?.display_name || ""}
          onPress={() => handleSelectLocation("destination")}
        />

        <PlanButton
          disabled={!start || !destination || !tripName.trim()}
          onPress={handlePlanTrip}
        />

        <Text
          onPress={handleReset}
          style={{
            marginTop: 10,
            textAlign: "center",
            color: "#000C66",
            fontSize: 15,
            textDecorationLine: "underline",
            ...arFontFamilySmiBold,
          }}
        >
          {t("reset")}
        </Text>
      </ScrollView>

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

      <BatteryWarningModal
        visible={showBatteryWarningModal}
        onClose={() => setShowBatteryWarningModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 70,
    backgroundColor: "#F5F7FA",
    flexGrow: 1,
    justifyContent: "center",
  },
  animation: {
    width: 220,
    height: 220,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
});

export default TripsScreen;
