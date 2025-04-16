{/*import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserProfileCard from "../components/UserProfileCard";
import MeLinksContainer from "../components/MeLinksContainer";
import { useNavigation } from "@react-navigation/native";
import Logo from "../components/Logo";
import SignOutButton from "../components/SignOutButton";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const MeScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useContext(AuthContext);
  

  // Mock user (replace with real fetch logic)
  useEffect(() => {
    if (isLoggedIn) {
      const mockUser = { name: "John Doe", email: "johndoe@example.com" };
      setUser(mockUser);
    }
  }, [isLoggedIn]);
  

  if (!isLoggedIn) {
    // If not logged in, show join/sign-up UI
    return (
      <View style={styles.container}>
        <Logo />
        <Text style={styles.subtitle}>Join the ElectraCar community</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Join")}>
          <Text style={styles.linkText}>Sign up or sign in today!</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 60 }}>
          <MeLinksContainer navigation={navigation} />
        </View>

        <Footer />
      </View>
    );
  }

  if (isLoggedIn && !user) {
    return (
      <View style={styles.container}>
        <Text>Loading your profile...</Text>
      </View>
    );
  }
  
  // If logged in, show profile and other content
  return (
    <View style={styles.container}>
      <UserProfileCard name={user.name} email={user.email} />
       <View style={{ marginTop: 60 }}>
          <MeLinksContainer navigation={navigation} />
        </View>

      <View style={styles.signOutButtonContainer}>
        <SignOutButton
          onPress={() => {
            logout(); // from AuthContext
            setUser(null); // local state
          }}
        />
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
    fontSize: 22,
    fontWeight:'bold',
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
*/}
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";

import Logo from "../components/Logo";
import Footer from "../components/Footer";
import MeLinksContainer from "../components/MeLinksContainer";
import UserProfileCard from "../components/UserProfileCard";
import SignOutButton from "../components/SignOutButton";

const MeScreen = () => {
  const navigation = useNavigation();
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Logo />
        <Text style={styles.subtitle}>Join the ElectraCar community</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Join")}>
          <Text style={styles.linkText}>Sign up or sign in today!</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 60 }}>
          <MeLinksContainer navigation={navigation} />
        </View>
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
      <UserProfileCard name={user.name} email={user.email} />
      <View style={{ marginTop: 60 }}>
        <MeLinksContainer navigation={navigation} />
      </View>
      <View style={styles.signOutButtonContainer}>
        <SignOutButton onPress={logout} />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "flex-start" },
  subtitle: { textAlign: "center", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  linkText: { color: "#007BFF", textAlign: "center", marginBottom: 20 },
  signOutButtonContainer: { marginTop: 20, padding: 10, borderRadius: 5 },
});

export default MeScreen;
