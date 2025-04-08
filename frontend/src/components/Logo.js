import React from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("../../assets/images/logo.png")} // Path to your app logo image
    style={styles.logo}
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default Logo;
