import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";
import Footer from "../components/Footer";

const containsArabic = (text) => /[\u0600-\u06FF]/.test(text);

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const getTextStyle = (text) =>
    containsArabic(text) ? styles.arabicText : {};
  const getTitleStyle = (text) =>
    containsArabic(text) ? styles.arabicTitle : {};
  const getButtonTextStyle = (text) =>
    containsArabic(text) ? styles.arabicButtonText : {};

  const validate = () => {
    if (!email.trim()) {
      setError(t("email_required"));
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t("invalid_email"));
      return false;
    }
    setError("");
    return true;
  };

 
  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "https://b0ab-2a01-9700-40a8-1c00-e448-6fcf-ad5c-860.ngrok-free.app/api/password/request",
          { email }
        );

        const fullMessage = response.data; // e.g., "Reset instructions sent. (Token: abc-123-xyz)"
        const extractedToken = fullMessage.match(/\(Token:\s*(.+)\)/)?.[1];

        console.log("Extracted token:", extractedToken);

        if (!extractedToken) {
          throw new Error("Token not found in response");
        }

        navigation.navigate("ResetPassword", {
          email,
          resetToken: extractedToken,
        });
      } catch (error) {
        console.error(
          "Password reset request failed:",
          error.response?.data || error.message
        );
        Alert.alert(t("error"), t("something_went_wrong"));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.centeredContent}>
          <View style={styles.formContainer}>
            <Logo />
            <Text
              style={[styles.title, getTitleStyle(t("forgot_password_title"))]}
            >
              {t("forgot_password_title")}
            </Text>
            <Text
              style={[
                styles.subtitle,
                getTextStyle(t("forgot_password_subtitle")),
              ]}
            >
              {t("forgot_password_subtitle")}
            </Text>

            <CustomInput
              placeholder={t("enter_email")}
              value={email}
              onChangeText={setEmail}
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              isRTL={containsArabic(t("enter_email"))}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text
                style={[
                  styles.buttonText,
                  getButtonTextStyle(t("send_reset_link")),
                ]}
              >
                {t("send_reset_link")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "black",
  },
  arabicTitle: {
    fontFamily: "IBM-SemiBold",
    fontWeight: undefined,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#444",
    marginBottom: 24,
  },
  arabicText: {
    fontFamily: "IBM-Regular",
    fontWeight: undefined,
  },
  button: {
    backgroundColor: "#000C66",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  arabicButtonText: {
    fontFamily: "IBM-SemiBold",
    fontWeight: undefined,
  },
});

export default ForgotPasswordScreen;
