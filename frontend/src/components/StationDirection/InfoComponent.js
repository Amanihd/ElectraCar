import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const InfoComponent = ({ routeInfo }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const arFontFamilySmiBold = isArabic
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };

  const getMinutesLabel = (minutes) => {
    if (minutes === 1 || minutes >= 11) {
      return t("minute"); 
    } else if (minutes === 2) {
      return t("two_minutes"); 
    } else {
      return t("minutes");
    }
  };

  return (
    <View style={styles.infoContainer}>
      <View
        style={[styles.infoRow, isArabic && { flexDirection: "row-reverse" }]}
      >
        <Ionicons name="location-sharp" size={20} color="#E63946" />
        <Text
          style={[
            styles.infoText,
            isArabic && { textAlign: "right", marginLeft: 0, marginRight: 10 },
            arFontFamilySmiBold,
          ]}
        >
          {" "}
          {t("distance")}: {routeInfo.distance} {t("km")}
        </Text>
      </View>
      <View
        style={[styles.infoRow, isArabic && { flexDirection: "row-reverse" }]}
      >
        <Ionicons name="car-sport" size={20} color="#1D3557" />
        <Text
          style={[
            styles.infoText,
            isArabic && { textAlign: "right", marginLeft: 0, marginRight: 10 },
            arFontFamilySmiBold,
          ]}
        >
          {" "}
          {t("time")}: {routeInfo.duration}{" "}
          {getMinutesLabel(routeInfo.duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: "#F8F9FA",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    color: "#343A40",
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default InfoComponent;
