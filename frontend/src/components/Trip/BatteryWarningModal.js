import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

const BatteryWarningModal = ({ visible, onClose }) => {
  const { t } = useTranslation();

  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons
          name="battery-dead"
          size={24}
          color="red"
          style={{ marginBottom: 15 }}
        />
        <Text style={[styles.title, arFontFamilySmiBold]}>
          {t("battery_not_enough_title") || "Battery Not Enough"}
        </Text>
        <Text style={[styles.text, arFontFamilyRegular]}>
          {t("battery_not_enough_message") ||
            "Your battery level is not enough for this trip."}
        </Text>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={[styles.buttonText, arFontFamilySmiBold]}>
            {t("ok") || "OK"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 320,
    alignItems: "center",
  },
  title: { fontSize: 18, color: "#000C66", textAlign: "center" },
  text: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "#000C66",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
  },
});

export default BatteryWarningModal;
