import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import MeLinksContainer from "../components/MeLinksContainer";
import UserProfileCard from "../components/UserProfileCard";
import i18next from "../services/i18next";
import { useTranslation } from "react-i18next";

const MeScreen = () => {
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Logo />
          <Text style={[styles.subtitle, arFontFamilySmiBold]}>
            {t("join_electracar")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Join")}>
            <Text style={[styles.linkText, arFontFamilyRegular]}>
              {t("sign_up_sign_in")}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 60 }}>
            <MeLinksContainer navigation={navigation} />
          </View>
          <Footer />
        </ScrollView>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t("loading_profile")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserProfileCard
          name={user.username}
          email={user.email}
          onSignOut={logout}
        />
        <MeLinksContainer navigation={navigation} />
        <Footer />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 10,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default MeScreen;
