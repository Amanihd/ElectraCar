{/*import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import CustomInput from "../components/CustomInput";
import JoinButton from "../components/JoinButton";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import TermsLinks from "../components/TermsLinks";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    else if (!/^[a-zA-Z]+$/.test(firstName.trim())) newErrors.firstName = "Only letters allowed";
    else if (firstName.length < 2 || firstName.length > 30) newErrors.firstName = "Must be 2–30 characters";

    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    else if (!/^[a-zA-Z]+$/.test(lastName.trim())) newErrors.lastName = "Only letters allowed";
    else if (lastName.length < 2 || lastName.length > 30) newErrors.lastName = "Must be 2–30 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "At least 8 characters";
    else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) newErrors.password = "Use letters & numbers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoin = () => {
    if (validate()) {
      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
      };
      login(newUser);
      navigation.navigate("MainTabs", { screen: "Me" });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>Create your account</Text>

        <CustomInput 
        placeholder="First Name" 
        value={firstName} 
        onChangeText={setFirstName} 
        error={errors.firstName} 
        />
        <CustomInput 
        placeholder="Last Name" 
        value={lastName} 
        onChangeText={setLastName} 
        error={errors.lastName} 
        />
        <CustomInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        error={errors.email} 
        keyboardType="email-address" 
        />
        <CustomInput 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        error={errors.password} 
        secureTextEntry 
        />

        <JoinButton onPress={handleJoin} />
        <TermsLinks />
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer: 
  { 
    flex: 1, 
    justifyContent: "space-between", 
    backgroundColor: "#f2f2f2" 
  },
  inner: 
  { 
    flex: 1, 
    padding: 20, 
    justifyContent: "center" 
  },
  title: 
  { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 24, 
    textAlign: "center", 
    color: "Black" 
  },
});

export default SignUpScreen;*/}
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  I18nManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import TermsLinks from "../components/TermsLinks";
import CustomInput from "../components/CustomInput";
import JoinButton from "../components/JoinButton";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  
    if (!firstName.trim()) newErrors.firstName = t("first_name_required");
    else if (!/^[a-zA-Z]+$/.test(firstName.trim()))
      newErrors.firstName = t("only_letters");
    else if (firstName.length < 3 || firstName.length > 30)
      newErrors.firstName = t("length");
  
    if (!lastName.trim()) newErrors.lastName = t("last_name_required");
    else if (!/^[a-zA-Z]+$/.test(lastName.trim()))
      newErrors.lastName = t("only_letters");
    else if (lastName.length < 2 || lastName.length > 30)
      newErrors.lastName = t("length");
  
    if (!email.trim()) newErrors.email = t("email_required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = t("invalid_email");
  
    if (!password.trim()) newErrors.password = t("password_required");
    else if (password.length < 8)
      newErrors.password = t("password_short");
    else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password))
      newErrors.password = t("password_mixed");
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleJoin = () => {
    if (validate()) {
      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
      };
      login(newUser);
      navigation.navigate("MainTabs", { screen: "Me" });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>{t("title")}</Text>

        <CustomInput
          placeholder={t("first_name")}
          value={firstName}
          onChangeText={setFirstName}
          error={errors.firstName}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder={t("last_name")}
          value={lastName}
          onChangeText={setLastName}
          error={errors.lastName}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder={t("email")}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CustomInput
          placeholder={t("password")}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />

        <JoinButton onPress={handleJoin} />
        <TermsLinks />
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "black",
  },
});
