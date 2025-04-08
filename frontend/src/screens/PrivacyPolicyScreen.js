import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 80 }}
    >
      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.modifiedDate}>Last updated: April 7, 2025</Text>

      <Text style={styles.paragraph}>
        At ElectraCar, your privacy is important to us. This privacy policy
        explains how we collect, use, and protect your information when you use
        our app. By using ElectraCar, you agree to the collection and use of
        information in accordance with this policy.
      </Text>

      <Text style={styles.subHeader}>1. Information We Collect</Text>
      <Text style={styles.paragraph}>
        We collect the information you provide when you use the app, such as
        your location and battery status. We also gather some technical
        information automatically, like your device type and operating system
        version, to help improve our service.
      </Text>

      <Text style={styles.subHeader}>2. How We Use Your Information</Text>
      <Text style={styles.paragraph}>
        The information we collect is used to provide you with accurate route
        suggestions, show nearby charging stations, and improve your overall
        experience. We may also use your data to troubleshoot issues, send
        updates, and improve our services.
      </Text>

      <Text style={styles.subHeader}>3. How We Protect Your Information</Text>
      <Text style={styles.paragraph}>
        We take security seriously and use a variety of security measures to
        protect your personal information. However, no method of electronic
        storage or transmission is 100% secure, and we can’t guarantee absolute
        security.
      </Text>

      <Text style={styles.subHeader}>4. Sharing Your Information</Text>
      <Text style={styles.paragraph}>
        We do not sell, rent, or trade your personal information. However, we
        may share your information with trusted partners who help us operate the
        app or provide services to you, under strict confidentiality agreements.
      </Text>

      <Text style={styles.subHeader}>5. Your Choices</Text>
      <Text style={styles.paragraph}>
        You have control over your information. You can choose to turn off
        location services or stop using the app at any time. However, most
        features of the app may not work as intended without location data.
      </Text>

      <Text style={styles.subHeader}>6. Changes to This Policy</Text>
      <Text style={styles.paragraph}>
        We may update this privacy policy from time to time as the app evolves.
        If we make any significant changes, we’ll notify you through the app or
        via other means. The date of the last update will always be displayed at
        the top of this page.
      </Text>

      <Text style={styles.paragraph}>
        Thank you for trusting ElectraCar with your information!
      </Text>
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

export default PrivacyPolicyScreen;
