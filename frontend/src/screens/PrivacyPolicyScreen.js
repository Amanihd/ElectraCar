import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const rtlTextAlign = { textAlign: isRTL ? "right" : "left" };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={[styles.header, rtlTextAlign]}>{t("header")}</Text>
      <Text style={[styles.modifiedDate, rtlTextAlign]}>{t("modifiedDate")}</Text>

      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("intro")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("infoCollectHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("infoCollect")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("useInfoHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("useInfo")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("protectInfoHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("protectInfo")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("shareInfoHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("shareInfo")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("yourChoicesHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("yourChoices")}
      </Text>

      <Text style={[styles.subHeader, rtlTextAlign]}>{t("changesPolicyHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("changesPolicy")}
      </Text>

      <Text style={[styles.paragraph, rtlTextAlign]}>
        {t("thankYou")}
      </Text>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "black",
  },
  modifiedDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    color: "black",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: "#333",
  },
});

export default PrivacyPolicyScreen;
