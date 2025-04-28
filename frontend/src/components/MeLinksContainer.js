import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MeLink from "./MeLink"; // Import your MeLink component
import { useTranslation } from "react-i18next"; // For translation
import LanguageModal from "./LanguageModal"; // Your modal component

const MeLinksContainer = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Hook to get translation function and i18n instance
  const [visible, setVisible] = useState(false); // For controlling the modal visibility

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change the language
    setVisible(false); // Close the modal after selection
  };

  return (
    <View style={styles.container}>
      <MeLink
        title="My Profile"
        icon="user"
        onPress={() => navigation.navigate("MyProfile")}
      />
      <MeLink
        title="FAQ"
        icon="question-circle"
        onPress={() => navigation.navigate("FAQ")}
      />
      <MeLink
        title="Support"
        icon="envelope"
        onPress={() => navigation.navigate("Support")}
      />
      <MeLink
        title="Terms of Use"
        icon="file-alt"
        onPress={() => navigation.navigate("TermsOfUse")}
      />
      <MeLink
        title="Privacy Policy"
        icon="shield-alt"
        onPress={() => navigation.navigate("PrivacyPolicy")}
      />

      {/* Language Selection Button */}
      <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
        <Text style={styles.buttonText}>{t("change-language")}</Text>
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
});

export default MeLinksContainer;
