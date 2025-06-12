import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

const VehicleConfirmModal = ({ visible, vehicle, onYes, onNo }) => {
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
        <Text style={[styles.title, arFontFamilySmiBold]}>
          {t("is_this_your_vehicle")}
        </Text>
        <Text style={[styles.text, arFontFamilyRegular]}>
          {vehicle.id === 0
            ? vehicle.make
            : `${vehicle.make} - ${vehicle.model} (${vehicle.trim})`}
        </Text>
        <View style={styles.buttons}>
          {vehicle.id !== 0 && (
            <Pressable style={styles.button} onPress={onYes}>
              <Text style={[styles.buttonText, arFontFamilySmiBold]}>
                {t("yes")}
              </Text>
            </Pressable>
          )}
          <Pressable
            style={[
              styles.button,
              { backgroundColor: vehicle.id === 0 ? "#000C66" : "#ccc" },
            ]}
            onPress={onNo}
          >
            <Text
              style={[
                styles.buttonText,
                { color: vehicle.id === 0 ? "#fff" : "#000" },
                arFontFamilySmiBold,
              ]}
            >
              {vehicle.id === 0 ? t("select_one") : t("no")}
            </Text>
          </Pressable>
        </View>
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
  title: { fontSize: 18, color: "#000C66" },
  text: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#000C66",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});

export default VehicleConfirmModal;
