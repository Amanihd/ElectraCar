import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location"; // Import Expo Location

const UserLocation = ({ setUserLocation }) => {
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const getLocation = async () => {
      // Request permission to access the user's location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        setIsLoading(false); // Stop loading if permission is denied
        return;
      }

      // Get the current position of the user
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Set the user's location in the parent component's state
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setIsLoading(false); // Stop loading after location is set
    };

    getLocation();
  }, []); // Empty dependency array ensures effect runs only once

  return (
    <View>
      {isLoading ? <Text>Loading location...</Text> : null}
    </View>
  );
};

export default UserLocation;
