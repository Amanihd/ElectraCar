import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const PlanButton = ({ disabled, onPress }) => {
  const { t } = useTranslation();
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
      <Text style={[styles.text, disabled && { color: "#666" }]}>
        {t("plan_my_trip")}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000C66",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PlanButton;
