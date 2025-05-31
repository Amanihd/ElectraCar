import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StationHeader from "../components/StationHeader";
import SectionDetail from "../components/SectionDetail";
import GetDirectionsButton from "../components/GetDirectionsButton";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";
import { TripContext } from "../context/TripContext";

const ChargingStationDetails = ({ route, navigation }) => {
  const { setDestination, setTripName } = useContext(TripContext);
  const { t } = useTranslation();
  const station = route?.params?.station;
  const isRTL = i18next.language === "ar";

  if (!station) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t("no_station_data")}</Text>
      </View>
    );
  }

  const handleGetDirections = async () => {
    if (!station) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${station.latitude}&lon=${station.longitude}`,
        {
          headers: {
            "User-Agent": "ElectraCarApp/1.0 (your@email.com)",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setDestination({
        latitude: station.latitude,
        longitude: station.longitude,
        display_name: data.display_name,
      });

      setTripName(station.title); 

      navigation.navigate("MainTabs", {
        screen: "Trips",
      });
    } catch (error) {
      console.error("Failed to fetch station location name:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.viewContent}
    >
      <View style={styles.imageContainer}>
        <Ionicons
          name={isRTL ? "arrow-forward" : "arrow-back"}
          size={30}
          color="white"
          onPress={() => navigation.goBack()}
          style={[
            styles.backButton,
            isRTL ? styles.rightPosition : styles.leftPosition,
          ]}
        />
        <Image
          source={require("../../assets/images/charging_station.jpg")}
          style={styles.stationImage}
        />
      </View>

     
      <StationHeader title={station.title} address={station.address} />

     
      <GetDirectionsButton onPress={handleGetDirections} />

    
      <View style={styles.detailsWrapper}>
       
        <SectionDetail
          title={t("plug_type")}
          content={station.plugType[0] || t("not_applicable")}
        />

       
        <SectionDetail
          title={t("cost")}
          content={station.cost ? `$${station.cost}` : t("not_applicable")}
        />

       
        <SectionDetail
          title={t("parking")}
          content={
            station.parking
              ? `${station.parking} ${
                  station.parking === 1 ? t("spot") : t("spots")
                }`
              : t("no_parking_info")
          }
        />

       
        <SectionDetail
          title={t("amenities")}
          content={
            station.amenities.length > 0
              ? station.amenities.join(", ") //this is array so puts all elements and put comma between them
              : t("no_amenities_listed")
          }
        />

       
        <SectionDetail
          title={t("plug_score")}
          content={station.plugScore ? station.plugScore : t("not_applicable")}
        />

       
        <SectionDetail
          title={t("fast_charging")}
          content={station.isFast ? t("yes") : t("no")}
        />

       
        <SectionDetail
          title={t("availability")}
          content={station.isAvailable ? t("available") : t("not_available")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  imageContainer: {
    position: "relative",
  },
  stationImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 40,
    zIndex: 1,
  },
  leftPosition: {
    left: 15,
  },
  rightPosition: {
    right: 15,
  },
  detailsWrapper: {
    marginTop: 50,
    paddingHorizontal: 15,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default ChargingStationDetails;
