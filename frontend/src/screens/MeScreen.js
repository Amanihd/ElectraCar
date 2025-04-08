import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserProfileCard from "../components/UserProfileCard";
import MeLinksContainer from "../components/MeLinksContainer";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo"; // Import the Logo component
import SignOutButton from "../components/SignOutButton"; // Import the SignOutButton component
import Footer from "../components/Footer";

const MeScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Mocking loading user (in a real scenario, you'd use useUserStore)
  useEffect(() => {
    const mockUser = { name: "John Doe", email: "johndoe@example.com" };
    setUser(mockUser);
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Logo />
        <Text style={styles.subtitle}>Join the ElectraCar community</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Join")}>
          <Text style={styles.linkText}>Sign up or sign in today!</Text>
        </TouchableOpacity>
        <MeLinksContainer navigation={navigation} />
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserProfileCard name={user.name} email={user.email} />
      <MeLinksContainer navigation={navigation} />
      <View style={styles.signOutButtonContainer}>
        <SignOutButton onPress={() => setUser(null)} />
      </View>
      <Footer />
    </View>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 10,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
  signOutButtonContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
});
