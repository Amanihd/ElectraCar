import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { VehicleContext } from "../context/VehicleContext";
import { useTranslation } from "react-i18next";



const UserProfileCard = ({ name, email, onSignOut }) => {
  const navigation = useNavigation();
  const { selectedVehicle } = useContext(VehicleContext);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={onSignOut}>
          <Text
            style={[
              styles.signOutText,
              isRTL && { fontFamily: "IBM-Regular" },
            ]}
          >
            {t("sign_out")}
          </Text>
        </TouchableOpacity>
      </View>

      <Ionicons
        name="person-circle-outline"
        size={100}
        color="#333"
        style={styles.profileIcon}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>

      <View style={styles.card}>
        <View
          style={[
            styles.cardLeft,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <Ionicons
            name="car-sport-outline"
            size={24}
            color="#000C66"
            style={{
              marginRight: isRTL ? 0 : 8,
              marginLeft: isRTL ? 8 : 0,
            }}
          />
          <Text
            style={[styles.cardTitle, isRTL && { fontFamily: "IBM-SemiBold" }]}
          >
            {t("selected_car")}
          </Text>
        </View>
        <Text style={styles.cardDetail}>
          <Text style={styles.cardTitle}>
            {selectedVehicle ? (
              `${selectedVehicle.make} - ${selectedVehicle.model}`
            ) : (
              <Text
                style={[
                  styles.noneSelected,
                  isRTL && { fontFamily: "IBM-SemiBold" },
                ]}
              >
                {t("none_selected")}
              </Text>
            )}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => navigation.navigate("VehiclePickScreen")}
        >
          <Text
            style={[
              styles.upgradeText,
              isRTL && { fontFamily: "IBM-SemiBold" },
            ]}
          >
            {t("choose_another")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    position: "relative",
  },
  topRow: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
  },
  signOutText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#000",
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    color: "#000",
  },
  cardDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  upgradeButton: {
    backgroundColor: "#000C66",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  upgradeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  noneSelected: {
    color: "#bbb",
    fontSize: 15,
  },
});

export default UserProfileCard;
