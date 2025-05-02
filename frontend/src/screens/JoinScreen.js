{/*import React, { useCallback, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import TermsLinks from "../components/TermsLinks";
import { AuthContext } from "../context/AuthContext";
import { CommonActions } from "@react-navigation/native";
const JoinScreen = () => {
  const navigation = useNavigation();

  //new code i added to force user return to home if he return back from join screen
  const { isLoggedIn } = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainTabs");
        return true; // Prevent default back behavior
      };
      // Add back handler
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      // Clean up the event listener on component unmount
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [navigation])
  );
  //-----------------------------------------------------


  return (
    <View style={styles.outerContainer}>
      <View style={styles.content}>
        <Logo />

        <Text style={styles.title}>Join ElectraCar</Text>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign up with Email</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.text}>Already a member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.linkText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <TermsLinks />
      </View>

      <Footer />
    </View>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 30,
    color: "black",
  },
  emailButton: {
    backgroundColor: "#000C66",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  link: {
    color: "black",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "#666",
  },
  linkText: {
    textAlign: "center",
    color: "#000C66",
    fontWeight: "bold",
  },
});*/}
import React, { useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  I18nManager,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import TermsLinks from "../components/TermsLinks";
import { AuthContext } from "../context/AuthContext";

const JoinScreen = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);
  const { t } = useTranslation();

  // Prevent going back to login or welcome screen
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainTabs");
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  const isRTL = I18nManager.isRTL;

  return (
    <View style={styles.outerContainer}>
      <View style={styles.content}>
        <Logo />

        <Text style={styles.title}>{t("join.title")}</Text>

        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>{t("join.signup_email")}</Text>
        </TouchableOpacity>

        <View style={[styles.linksContainer, isRTL && { flexDirection: "row-reverse" }]}>
          
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text>
            <Text style={styles.text}>{t("join.already_member")} </Text>
            <Text style={styles.linkText}>{t("join.signin")}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TermsLinks />
      </View>

      <Footer />
    </View>
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 30,
    color: "black",
    textAlign: "center",
  },
  emailButton: {
    backgroundColor: "#000C66",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: "#666",
    fontSize: 14,
  },
  linkText: {
    color: "#000C66",
    fontWeight: "bold",
    fontSize: 14,
  },
});

