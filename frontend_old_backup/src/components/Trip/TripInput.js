import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const TripInput = ({ label, value, onPress }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

const arFontFamilyRegular = isArabic ? { fontFamily: "IBM-Regular" } : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.input, isArabic && styles.inputRTL]}
    >
      <Text style={[styles.emoji, isArabic && styles.emojiRTL]}>{label}</Text>
      <Text style={[styles.text, isArabic && styles.textRTL,arFontFamilyRegular]}>
        {value || t("select_location")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  inputRTL: {
    flexDirection: "row-reverse",
  },
  emoji: {
    fontSize: 18,
    marginRight: 10,
  },
  emojiRTL: {
    marginRight: 0,
    marginLeft: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    flex: 1,
    flexWrap: "wrap",
  },
  textRTL: {
    textAlign: "right",
  },
});

export default TripInput;
