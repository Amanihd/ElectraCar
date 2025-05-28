import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import axios from "axios";

const SignInScreen = () => {
  const navigation = useNavigation();
  const { login, updateUser } = useContext(AuthContext);

  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Arabic text styles
  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const arabicTitleStyle = isRTL ? styles.arabicTitle : {};
  const arabicButtonTextStyle = isRTL ? styles.arabicButtonText : {};

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = t("email_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      newErrors.email = t("invalid_email_signin");

    if (!password.trim()) newErrors.password = t("password_required");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSignIn = async () => {
  if (validate()) {
    try {
      // 1. Call login API
      const loginResponse = await axios.post(
        "https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/user/login",
        {
          userEmail: email,
          password: password,
        }
      );
      const { jwtToken } = loginResponse.data;

      // 2. Save token in context immediately (user null for now)
      login(null, jwtToken);

      // 3. Fetch user info with token
      const userResponse = await axios.get("https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/user/me", {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      // 4. Save user info in context
      updateUser(userResponse.data);

      // 5. Navigate after successful login and user fetch
      navigation.navigate("MainTabs", { screen: "Me" });
    } catch (error) {
      if (error.response) {
        console.log("Login failed:", error.response.data);
      } else {
        console.log("Login failed:", error.message);
      }
    }
  }
};


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.content}>
          <Logo />
          <Text style={[styles.title, arabicTitleStyle]}>{t("sign_in")}</Text>

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
            secureTextEntry={!showPassword}
            isRTL={isRTL}
          />

          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={[styles.buttonText, arabicButtonTextStyle]}>
              {t("sign_in")}
            </Text>
          </TouchableOpacity>

          <View
            style={[styles.linksContainer, isRTL && styles.rtlLinksContainer]}
          >
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={[styles.text, arabicTextStyle]}>
                {t("not_a_member") + " "}
                <Text style={[styles.linkText, arabicTextStyle]}>
                  {t("sign_up")}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={[styles.linkText, arabicTextStyle]}>
              {t("forgot_password_question")}
            </Text>
          </TouchableOpacity>
        </View>

        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center vertically
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 90,
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
  },
  button: {
    backgroundColor: "#000C66",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  arabicButtonText: {
    fontFamily: "IBM-SemiBold",
    fontWeight: undefined,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  rtlLinksContainer: {
    flexDirection: "row-reverse",
  },
  text: {
    color: "#666",
  },
  arabicText: {
    fontFamily: "IBM-SemiBold",
    fontWeight: undefined,
  },
  linkText: {
    color: "#000C66",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignInScreen;
