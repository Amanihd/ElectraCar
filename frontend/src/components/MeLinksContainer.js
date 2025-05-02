import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import MeLink from "./MeLink"; // Import your MeLink component
import { useTranslation } from "react-i18next"; // For translation
import LanguageModal from "./LanguageModal"; // Your modal component

const MeLinksContainer = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Hook to get translation function and i18n instance
  const [visible, setVisible] = useState(false); // For controlling the modal visibility
  const isRTL = i18n.language === "ar";

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change the language
    setVisible(false); // Close the modal after selection
  };

  return (
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      <MeLink
        title={t("my_profile")}
        icon="user"
        onPress={() => navigation.navigate("MyProfile")}
        isRTL={isRTL}
      />
      <MeLink
        title={t("faq")}
        icon="question-circle"
        onPress={() => navigation.navigate("FAQ")}
        isRTL={isRTL}
      />
      <MeLink
        title={t("support")}
        icon="envelope"
        onPress={() => navigation.navigate("Support")}
        isRTL={isRTL}
      />
      <MeLink
        title={t("terms_of_use")}
        icon="file-alt"
        onPress={() => navigation.navigate("TermsOfUse")}
        isRTL={isRTL}
      />
      <MeLink
        title={t("privacy_policy")}
        icon="shield-alt"
        onPress={() => navigation.navigate("PrivacyPolicy")}
        isRTL={isRTL}
      />

      {/* Language Selection Button */}
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={[styles.buttonText,isRTL && { fontFamily: "IBM-Regular" }]}>{t("change-language")}</Text>
      </TouchableOpacity>

      {/* Language Modal */}
      <LanguageModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        changeLanguage={changeLanguage}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#EAF0FF",
    borderRadius: 18,
    marginTop: 15,
  },
  buttonText: {
    color: "#007BFF",
    textAlign: "center",
    fontSize: 16,
  },
});

export default MeLinksContainer;
