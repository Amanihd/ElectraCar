import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const SectionDetail = ({ title, content }) => {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <View style={[styles.container, isArabic && styles.arabicContainer]}>
      <Text style={[styles.sectionHeader, isArabic && styles.arabicText]}>
        {title}
      </Text>
      <Text style={isArabic && styles.arabicText}>
        {content || t("not_available")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    backgroundColor: "white",
    borderBottomColor: "#ddd",
    paddingLeft: 25,
  },
  arabicContainer: {
    paddingRight: 25,
    paddingLeft: 10,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 7,
  },
  arabicText: {
    textAlign: "right",
    writingDirection: "rtl",
  },
});

export default SectionDetail;
