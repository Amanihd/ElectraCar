import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import TermsLinks from "../components/TermsLinks";
import CustomInput from "../components/CustomInput";
import JoinButton from "../components/JoinButton";
import axios from "axios";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const { login } = useContext(AuthContext);
  const isRTL = i18n.dir() === "rtl";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const arabicTitleStyle = isRTL ? styles.arabicTitle : {};

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = t("first_name_required");
    else if (!/^[a-zA-Z\u0600-\u06FF]+$/.test(firstName.trim()))
      newErrors.firstName = t("only_letters");
    else if (firstName.length < 3 || firstName.length > 10)
      newErrors.firstName = t("length");

    if (!lastName.trim()) newErrors.lastName = t("last_name_required");
    else if (!/^[a-zA-Z\u0600-\u06FF]+$/.test(lastName.trim()))
      newErrors.lastName = t("only_letters");
    else if (lastName.length < 3 || lastName.length > 15)
      newErrors.lastName = t("length");

    if (!email.trim()) newErrors.email = t("email_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = t("invalid_email");

    if (!password.trim()) newErrors.password = t("password_required");
    else if (password.length < 8) newErrors.password = t("password_short");
    else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password))
      newErrors.password = t("password_mixed");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleJoin = async () => {
    if (validate()) {
      const newUser = {
        username: `${firstName}${lastName}`.toLowerCase(),
        email: email.trim(),
        password: password,
        roles: ["user"],
      };

      try {
        const response = await axios.post(
          "https://electracar.onrender.com/api/user/signup",
          newUser
        );
        const { jwtToken } = response.data;

        login(newUser, jwtToken);

        navigation.navigate("MainTabs", { screen: "Me" });
      } catch (error) {
        if (error.response) {
          console.log("Signup failed:", error.response.data); // ⬅️ This shows backend's error message
        } else {
          console.log("Signup failed:", error.message);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <Logo />
          <Text style={[styles.title, arabicTitleStyle]}>{t("title")}</Text>

          <CustomInput
            placeholder={t("first_name")}
            value={firstName}
            onChangeText={setFirstName}
            error={errors.firstName}
            autoCapitalize="words"
            isRTL={isRTL}
          />
          <CustomInput
            placeholder={t("last_name")}
            value={lastName}
            onChangeText={setLastName}
            error={errors.lastName}
            autoCapitalize="words"
            isRTL={isRTL}
          />
          <CustomInput
            placeholder={t("email")}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            isRTL={isRTL}
          />
          <CustomInput
            placeholder={t("password")}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            isRTL={isRTL}
          />

          <JoinButton onPress={handleJoin} isRTL={isRTL} />
          <TermsLinks />
        </View>

        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  inner: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "black",
  },
  arabicTitle: {
    fontFamily: "IBM-SemiBold",
    fontWeight: undefined,
    writingDirection: "rtl",
  },
  arabicText: {
    fontFamily: "IBM-Regular",
    fontWeight: undefined,
    writingDirection: "rtl",
  },
});
