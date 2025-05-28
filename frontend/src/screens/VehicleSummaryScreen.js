import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import LottieView from "lottie-react-native";
import VehicleButton from "../components/VehicleButton";
import { VehicleContext } from "../context/VehicleContext";
import allVehiclesData from "../data/vehicles.json";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const VehicleSummaryScreen = () => {
  const { make, model, trim, fromVehicleModal } = useRoute().params;
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { token } = useContext(AuthContext);
  const { addVehicle, setSelectedVehicle, vehicles } =
    useContext(VehicleContext);

  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const textAlignmentStyle = isRTL ? styles.rtlText : styles.ltrText;

  const handleAddVehicle = async () => {
    const fullVehicle = allVehiclesData.find(
      (v) => v.make === make && v.model === model && v.trim === trim
    );

    if (!fullVehicle) {
      console.warn("Vehicle data not found!");
      return;
    }

    const alreadyExists = vehicles.some(
      (v) => v.make === make && v.model === model && v.trim === trim
    );

    if (alreadyExists) {
      navigation.navigate("VehiclePickScreen", {
        fromVehicleModal: fromVehicleModal || false,
      });
      return;
    }

    try {
      const payload = {
        make: fullVehicle.make,
        model: fullVehicle.model,
        trim: fullVehicle.trim,
        batteryCapacityKwh: fullVehicle.battery_capacity_kWh,
        rangeKm: fullVehicle.range_km,
        chargingTimeH: fullVehicle.charging_time_h,
        selected: true,
      };

      const response = await axios.post(
        "https://electracar.onrender.com/api/vehicles",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Vehicle added:", response.data);

      // Optional: sync state with backend response
      addVehicle(response.data);
      setSelectedVehicle(response.data);

      navigation.navigate("VehiclePickScreen", {
        fromVehicleModal: fromVehicleModal || false,
      });
    } catch (error) {
      console.error(
        "Failed to add vehicle:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/images/vehicle.json")}
        style={styles.animation}
        autoPlay
        loop
      />

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${make} :${t("vehicle_summary.make")}`
          : `${t("vehicle_summary.make")}: ${make}`}
      </Text>

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${model} :${t("vehicle_summary.model")}`
          : `${t("vehicle_summary.model")}: ${model}`}
      </Text>

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${trim} :${t("vehicle_summary.trim")}`
          : `${t("vehicle_summary.trim")}: ${trim}`}
      </Text>

      <VehicleButton
        label={t("vehicle_summary.add_vehicle")}
        onPress={handleAddVehicle}
        isRTL={isRTL}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  animation: {
    width: 400,
    height: 300,
    alignSelf: "center",
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 8,
    color: "#000",
  },
  ltrText: {
    textAlign: "left",
  },
  rtlText: {
    textAlign: "right",
  },
  arabicText: {
    fontFamily: "IBM-Regular",
    fontWeight: undefined,
  },
});

export default VehicleSummaryScreen;
