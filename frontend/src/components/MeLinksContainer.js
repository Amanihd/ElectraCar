import React from "react";
import { View, StyleSheet } from "react-native";
import MeLink from "./MeLink"; // Import your MeLink component

const MeLinksContainer = ({ navigation }) => {
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

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default MeLinksContainer;
