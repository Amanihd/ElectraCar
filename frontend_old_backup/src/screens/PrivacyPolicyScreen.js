import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const PrivacyPolicyScreen = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const rtlTextAlign = { textAlign: isRTL ? "right" : "left" };
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={[styles.header, rtlTextAlign,arFontFamilySmiBold]}>{t("header")}</Text>
      <Text style={[styles.modifiedDate, rtlTextAlign,arFontFamilyRegular]}>
        {t("modifiedDate")}
      </Text>

      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("intro")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>
        {t("infoCollectHeader")}
      </Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("infoCollect")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>{t("useInfoHeader")}</Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("useInfo")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>
        {t("protectInfoHeader")}
      </Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("protectInfo")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>
        {t("shareInfoHeader")}
      </Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("shareInfo")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>
        {t("yourChoicesHeader")}
      </Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("yourChoices")}</Text>

      <Text style={[styles.subHeader, rtlTextAlign,arFontFamilySmiBold]}>
        {t("changesPolicyHeader")}
      </Text>
      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("changesPolicy")}</Text>

      <Text style={[styles.paragraph, rtlTextAlign,arFontFamilyRegular]}>{t("thankYou")}</Text>

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
    marginBottom: 20,
    alignSelf: "center",
    color: "black",
  },
  modifiedDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 20,
  },
  subHeader: {
    fontSize: 20,
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
