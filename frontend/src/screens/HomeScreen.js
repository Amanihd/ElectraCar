import { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import BottomBar from "../components/BottomBar";
import MainMap from "../components/MainMap";
import { UserLocationContext } from "../context/UserLocationContext";

const HomeScreen = ({ navigation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [filterTypes, setFilterTypes] = useState([]);
  const { setUserLocation: setContextUserLocation } =
    useContext(UserLocationContext); // I renmae it to setContextUserLocation cuz i already have setUserLocation

  useEffect(() => {
    const fetchLocationName = async () => {
      if (userLocation?.latitude && userLocation?.longitude) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation.latitude}&lon=${userLocation.longitude}`,
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
          const locationWithName = {
            ...userLocation,
            display_name: data.display_name,
          };
          setContextUserLocation(locationWithName);
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
      }
    };

    fetchLocationName();
  }, [userLocation]);

  return (
    <View style={styles.container}>
      <MainMap getlocation={setUserLocation} filterTypes={filterTypes} />
      <View style={styles.barContainer}>
        <BottomBar
          userLocation={userLocation}
          navigation={navigation}
          setFilterTypes={setFilterTypes}
          filterTypes={filterTypes}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  barContainer: {
    position: "absolute",
    bottom: -5,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
