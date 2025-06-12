import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

const BatteryLevelModal = ({
  visible,
  batteryLevel,
  onValueChange,
  onContinue,
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(batteryLevel.toString());

  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  if (!visible) return null;

  // Handle input change and ensure the value is between 0 and 100
  const handleInputChange = (value) => {
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      const newValue = Math.min(Math.max(parseInt(value) || 0, 0), 100);
      setInputValue(newValue.toString());
      onValueChange(newValue); // Update the value directly when input changes
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={[styles.title,arFontFamilySmiBold]}>{t("battery_level")}</Text>
        <Text style={[styles.text,arFontFamilyRegular]}>
          {batteryLevel}% {t("charged")}
        </Text>

        {/* Input for manual entry */}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
        />

        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={[styles.continue,arFontFamilySmiBold]} onPress={onContinue}>
            {t("continue")}
          </Text>
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
  text: { fontSize: 16, marginVertical: 20, color: "#333" },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  continue: {
    backgroundColor: "#000C66",
    color: "#fff",
    textAlign: "center",
    padding: 12,
    borderRadius: 10,
  },
});

export default BatteryLevelModal;
