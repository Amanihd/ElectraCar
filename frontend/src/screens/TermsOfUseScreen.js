import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Footer from "../components/Footer";

const TermsOfUseScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.header}>Terms of Use</Text>
      <Text style={styles.modifiedDate}>Last updated: April 7, 2025</Text>

      <Text style={styles.paragraph}>
        Welcome to ElectraCar. By using this app, you're agreeing to follow the
        rules outlined here. If you don’t agree with anything, please don’t use
        the app.
      </Text>

      <Text style={styles.subHeader}>1. Purpose</Text>
      <Text style={styles.paragraph}>
        ElectraCar helps you plan your trip by letting you choose a starting
        point and destination, then checking your current battery level. If you
        don’t have enough charge to reach your destination, the app will guide
        you to a nearby charging station along the way. It doesn’t handle
        payments or reservations.
      </Text>

      <Text style={styles.subHeader}>2. Data & Location</Text>
      <Text style={styles.paragraph}>
        We use your location to show relevant stations and routes. Your data
        stays private and is only used to improve your experience.
      </Text>

      <Text style={styles.subHeader}>3. No Guarantees</Text>
      <Text style={styles.paragraph}>
        We try our best to keep the information accurate, but we can’t guarantee
        that all stations are available or working at all times.
      </Text>

      <Text style={styles.subHeader}>4. Respectful Use</Text>
      <Text style={styles.paragraph}>
        Please use the app responsibly. Don’t try to misuse or break the app in
        any way.
      </Text>

      <Text style={styles.subHeader}>5. Changes</Text>
      <Text style={styles.paragraph}>
        These terms might change as the app grows. If we make any important
        updates, we’ll do our best to let you know. We also include the date of
        the last update at the top of this page so you can stay informed.
      </Text>

      <Text style={styles.paragraph}>Thanks for using ElectraCar!</Text>
      <Footer/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    color: "black",
  },
  modifiedDate: {
    fontSize: 14,
    color: "#777",
    marginTop: 20,
    fontStyle: "italic",
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 25,
    color: "black",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: "#333",
  },
});

export default TermsOfUseScreen;
