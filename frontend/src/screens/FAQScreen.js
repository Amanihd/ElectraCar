import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import Footer from "../components/Footer";



const FAQScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.header}>Frequently Asked Questions (FAQ)</Text>

      <Text style={styles.subHeader}>Q: What is ElectraCar?</Text>
      <Text style={styles.paragraph}>
        A: ElectraCar is an app designed to help you plan your electric vehicle
        (EV) trips. It shows you nearby charging stations and suggests the best
        routes to reach them based on your starting point, destination, and
        current battery level.
      </Text>

      <Text style={styles.subHeader}>
        Q: How do I use ElectraCar for trip planning?
      </Text>
      <Text style={styles.paragraph}>
        A: You simply enter your starting point and destination, and the app
        checks your vehicle’s battery level. If your battery isn't sufficient to
        reach your destination, the app will suggest nearby charging stations
        along the route.
      </Text>

      <Text style={styles.subHeader}>
        Q: Do I need to enter my vehicle type, plug type, and model in the app?
      </Text>
      <Text style={styles.paragraph}>
        A: Yes, to get the most accurate route recommendations, please enter
        your vehicle type, plug type, and model in the app. This ensures we show
        you compatible charging stations.
      </Text>

      <Text style={styles.subHeader}>
        Q: How does ElectraCar determine the best route for my trip?
      </Text>
      <Text style={styles.paragraph}>
        A: ElectraCar calculates the best route based on your starting point,
        destination, and battery level. If your battery isn’t enough to reach
        your destination, the app will guide you to nearby charging stations
        along the way.
      </Text>

      <Text style={styles.subHeader}>
        Q: Can I reserve a charging spot at a station through the app?
      </Text>
      <Text style={styles.paragraph}>
        A: No, currently, ElectraCar does not support reservations. We recommend
        arriving early to secure a spot at your selected charging station.
      </Text>

      <Text style={styles.subHeader}>
        Q: Is my data safe when using ElectraCar?
      </Text>
      <Text style={styles.paragraph}>
        A: Yes, your privacy and data security are very important to us. We do
        not share your data with third parties, and we only use it to improve
        your experience with the app.
      </Text>

      <Text style={styles.subHeader}>
        Q: How do I update my vehicle details in the app?
      </Text>
      <Text style={styles.paragraph}>
        A: You can easily update your vehicle type, model, and plug type in the
        app’s settings or profile section. Keeping this information up-to-date
        ensures accurate recommendations.
      </Text>

      <Text style={styles.subHeader}>
        Q: Will the app work without an internet connection?
      </Text>
      <Text style={styles.paragraph}>
        A: ElectraCar requires an internet connection to show real-time data,
        such as charging station availability and route updates. For the best
        experience, ensure you have a stable internet connection.
      </Text>

      <Text style={styles.subHeader}>
        Q: How do I report a problem with a charging station?
      </Text>
      <Text style={styles.paragraph}>
        A: If you encounter a problem with a charging station, you can report it
        through the app’s support section, and we will investigate and update
        the information as needed.
      </Text>

      <Text style={styles.subHeader}>
        Q: How do I contact customer support for help with the app?
      </Text>
      <Text style={styles.paragraph}>
        A: You can contact our customer support team by visiting the "Me"
        section in the app and using the support page, which contains our email
        address. We’re happy to assist you with any questions or issues.
      </Text>

      <Text style={[styles.paragraph, { marginTop: 20 }]}>
        If you have any other questions, feel free to reach out to us! You can
        contact us through the{" "}
        <Text
          style={{ color: "#0000EE" }}
          onPress={() => {
           navigation.navigate("Support");
          }}
        >
          Support Page {/* add space */}
        </Text>
        in the "Me" section.
      </Text>

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
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    color: "black",
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: "#333",
  },
 
});

export default FAQScreen;
