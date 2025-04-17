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


const MeScreen = () => {
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Logo />
          <Text style={styles.subtitle}>Join the ElectraCar community</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Join")}>
            <Text style={styles.linkText}>Sign up or sign in today!</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 60 }}>
            <MeLinksContainer navigation={navigation} />
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <UserProfileCard name={user.name} email={user.email} onSignOut={logout} />
        <MeLinksContainer navigation={navigation} />
        <Footer/>
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
    fontWeight: "bold",
    marginBottom: 10,
  },
  linkText: {
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default MeScreen;
