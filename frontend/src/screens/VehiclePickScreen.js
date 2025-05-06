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

const VehiclePickScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { vehicles, setSelectedVehicle } = useContext(VehicleContext);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const arabicTextStyle = isRTL ? styles.arabicText : {};

  // if no vehicle added
  useEffect(() => {
    if (vehicles.length === 0) {
      navigation.replace("AddVehicle");
    }
  }, [vehicles]);

  const handleSelect = () => {
    const chosen = vehicles.find((v) => v.id === selectedId);
    if (chosen) {
      setSelectedVehicle(chosen);
      navigation.navigate('MainTabs', { screen: 'Me' })
    } else {
      navigation.navigate("AddVehicle");
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedId(item.id)} style={styles.item}>
      <Text style={styles.vehicleText}>
        {item.make} {item.model} ({item.trim})
      </Text>
      <Text style={styles.radio}>{selectedId === item.id ? "●" : "○"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity onPress={() => navigation.navigate("ManageVehiclesScreen")}>
        <Text style={[styles.link, arabicTextStyle]}>
          {t("vehicle_pick.manage")}
        </Text>
      </TouchableOpacity>

      <VehicleButton 
        label={t("vehicle_pick.add_vehicle")} 
        onPress={handleSelect}
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

