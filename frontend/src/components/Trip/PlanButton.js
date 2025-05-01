import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next"

const PlanButton = ({ disabled, onPress }) => {
  const { t } = useTranslation();
    const isRTL = i18next.language === "ar";
    const arFontFamilySmiBold = isRTL
      ? { fontFamily: "IBM-SemiBold" }
      : { fontWeight: "bold" };
    

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && { opacity: 0.9, transform: [{ scale: 0.98 }] },
        disabled && { backgroundColor: "#ccc" },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, disabled && { color: "#666" },arFontFamilySmiBold]}>
        {t("plan_my_trip")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000C66",
    padding: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PlanButton;
