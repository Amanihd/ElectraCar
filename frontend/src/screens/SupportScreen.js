import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const SupportScreen = () => {
  const { t } = useTranslation();
 

  const handleEmailPress = () => {
    Linking.openURL("mailto:support@electracar.com");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t("support_title")}</Text>
      <Text style={styles.subHeader}>{t("support_subtitle")}</Text>
      <Text style={styles.paragraph}>{t("support_line1")}</Text>
      <Text style={styles.paragraph}>{t("support_line2")}</Text>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.emailLink}>support@electracar.com</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>{t("support_line3")}</Text>
      <Footer />
    </View>
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
    color: "black",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "black",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: "#333",
    textAlign: "center",
  },
  emailLink: {
    fontSize: 16,
    color: "#0000EE",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 10,
  },
});

export default SupportScreen;
