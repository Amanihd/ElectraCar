import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import MainContainer from "./src/navigations/MainContainer";
import { UserLocationProvider } from "./src/context/UserLocationContext";
import { VehicleProvider } from "./src/context/VehicleContext";
import { BatteryProvider } from "./src/context/BatteryContext";
import { AuthProvider } from "./src/context/AuthContext";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { TripProvider } from "./src/context/TripContext";

const loadFonts = () => {
  return Font.loadAsync({
    "IBM-Regular": require("./assets/fonts/IBMPlexSansArabic-Regular.ttf"),
    "IBM-SemiBold": require("./assets/fonts/IBMPlexSansArabic-SemiBold.ttf"),
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#000C66");
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthProvider>
    <UserLocationProvider>
      <TripProvider>
        <VehicleProvider>
          <BatteryProvider>
            <MainContainer />
          </BatteryProvider>
        </VehicleProvider>
      </TripProvider>
    </UserLocationProvider>
  </AuthProvider>
  );
};

export default App;
