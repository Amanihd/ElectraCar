
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const Footer = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  return (
    <View style={styles.footer}>
      <Text style={[styles.footerText, arFontFamilyRegular]}>
        {t("footer_text")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 30,
    alignItems: "center",
    marginTop: "auto", 
  },
  footerText: {
    color: "#888", 
    fontSize: 14,
  },
});

export default Footer;
