import React from "react";
import { View, StyleSheet } from "react-native";
import MeLink from "./MeLink"; // Import your MeLink component

const MeLinksContainer = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <MeLink title="FAQ" onPress={() => navigation.navigate("FAQ")} />
      <MeLink
        title="Support"
        onPress={() => navigation.navigate("Support")}
      />
      <MeLink
        title="Terms of Use"
        onPress={() => navigation.navigate("TermsOfUse")}
      />
      <MeLink
        title="Privacy Policy"
        onPress={() => navigation.navigate("PrivacyPolicy")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // Add some spacing above the links
  },
});

export default MeLinksContainer;
