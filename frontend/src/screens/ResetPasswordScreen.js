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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CustomInput from "../components/CustomInput";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import axios from "axios";

const PasswordReset = () => {
  const navigation = useNavigation();
  // const email = route.params?.email || '';

  const route = useRoute();
  const { email, resetToken } = route.params;

  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  // Arabic text styles
  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const arabicTitleStyle = isRTL ? styles.arabicTitle : {};
  const arabicSubtitleStyle = isRTL ? styles.arabicText : {};
  const arabicButtonTextStyle = isRTL ? styles.arabicButtonText : {};

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!newPassword.trim()) {
      setError(t("password_required"));
      return false;
    } else if (newPassword.length < 8) {
      setError(t("password_min_length"));
      return false;
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
      setError(t("password_letters_numbers"));
      return false;
    } else if (newPassword !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      return false;
    }
    setError("");
    return true;
  };

  const showCustomAlert = () => {
    Alert.alert(
      t("password_updated"),
      t("password_updated_description"),
      [
        {
          text: t("ok_button"),
          onPress: () => navigation.navigate("SignIn"),
          style: "default",
        },
      ],
      {
        textDirection: isRTL ? "rtl" : "ltr",
      }
    );
  };

  // const handleReset = () => {
  //   if (validate()) {
  //     // Here will be backend logic
  //     showCustomAlert();
  //   }
  // };

  const handleReset = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "https://d650-91-186-254-248.ngrok-free.app/api/password/reset",
          {
            token: resetToken,
            newPassword: newPassword,
          }
        );

        if (response.status === 200) {
          // Optionally, you can check response.data.message === 'password updated'
          showCustomAlert();
        } else {
          Alert.alert(t("error"), t("something_went_wrong"));
        }
      } catch (error) {
        console.error(
          "Password reset failed:",
          error.response?.data || error.message
        );
        Alert.alert(t("error"), t("something_went_wrong"));
      }
    }
    console.log("Reset token being sent:", resetToken);
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
        <View style={styles.centeredContent}>
          <Logo />
          <Text style={[styles.title, arabicTitleStyle]}>
            {t("reset_password")}
          </Text>
          <Text style={[styles.subtitle, arabicSubtitleStyle]}>
            {t("resetting_password_for")}: {email}
          </Text>

          <CustomInput
            placeholder={t("new_password")}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            error={error}
            isRTL={isRTL}
          />

          <CustomInput
            placeholder={t("confirm_password")}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            isRTL={isRTL}
          />

          {error ? (
            <Text style={[styles.errorText, arabicTextStyle]}>{error}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={[styles.buttonText, arabicButtonTextStyle]}>
              {t("update_password")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
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
    fontSize: 14,
    textAlign: "center",
    color: "#444",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 8,
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
  arabicText: {
    fontFamily: "IBM-Regular",
    fontWeight: undefined,
  },
});

export default PasswordReset;
