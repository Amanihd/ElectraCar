// Footer.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{t("footer_text")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: "center",
    marginTop: "auto", // This ensures the footer stays at the bottom of the screen
  },
  footerText: {
    color: "#888", // Gray color for the copyright text
    fontSize: 14,
  },
});

export default Footer;
