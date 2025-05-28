import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import VehicleButton from "../components/VehicleButton";
import { useTranslation } from "react-i18next";
import { VehicleContext } from "../context/VehicleContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const VehiclePickScreen = ({ route }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const { vehicles, setVehicles, setSelectedVehicle } =
    useContext(VehicleContext);
  const { token } = useContext(AuthContext);

  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const arabicTextStyle = isRTL ? styles.arabicText : {};

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/vehicles/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setVehicles(response.data);

        // **Add this block here**
        const selectedVehicle = response.data.find(
          (vehicle) => vehicle.selected === true
        );
        if (selectedVehicle) {
          setSelectedId(selectedVehicle.id);
          setSelectedVehicle(selectedVehicle);
        }
      } catch (error) {
        console.error(
          "Failed to fetch vehicles:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (!loading && vehicles.length === 0) {
      navigation.replace("AddVehicle", {
        fromVehicleModal: route?.params?.fromVehicleModal,
      });
    }
  }, [vehicles, loading]);

  const handleSelectVehicle = async (vehicleId) => {
    try {
      const response = await axios.put(
        `https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/vehicles/select/${vehicleId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const selectedVehicleFromAPI = response.data;

      setSelectedVehicle(selectedVehicleFromAPI);
      setSelectedId(selectedVehicleFromAPI.id);

      setVehicles((prevVehicles) =>
        prevVehicles.map((v) =>
          v.id === selectedVehicleFromAPI.id
            ? { ...selectedVehicleFromAPI }
            : { ...v, selected: false }
        )
      );

      if (route?.params?.fromVehicleModal) {
        navigation.navigate("MainTabs", {
          screen: "Trips",
          params: { reopenVehicleModal: true },
        });
      } else {
        navigation.navigate("MainTabs", { screen: "Me" });
      }
    } catch (error) {
      console.error(
        "Failed to select vehicle:",
        error.response?.data || error.message
      );
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSelectVehicle(item.id)}
      style={styles.item}
    >
      <Text style={styles.vehicleText}>
        {item.make} {item.model} ({item.trim})
      </Text>
      <Text style={styles.radio}>{selectedId === item.id ? "●" : "○"}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>{t("loading")}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("ManageVehiclesScreen")}
      >
        <Text style={[styles.link, arabicTextStyle]}>
          {t("vehicle_pick.manage")}
        </Text>
      </TouchableOpacity>

      <VehicleButton
        label={t("vehicle_pick.add_vehicle")}
        onPress={() => navigation.navigate("AddVehicle")}
        isRTL={isRTL}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  vehicleText: { fontSize: 16, color: "black", textAlign: "left" },
  radio: { fontSize: 20 },
  link: {
    color: "#0033A0",
    marginTop: 19,
    fontSize: 20,
    textAlign: "center",
  },
  arabicText: {
    fontFamily: "IBM-Regular",
  },
});

export default VehiclePickScreen;
