import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import MainContainer from "./src/navigations/MainContainer";
import { UserLocationProvider } from "./src/context/UserLocationContext";
import { VehicleProvider } from "./src/context/VehicleContext";
import { BatteryProvider } from "./src/context/BatteryContext";
import { AuthProvider } from "./src/context/AuthContext"; 

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#000C66");
  }, []);

  return (
    <AuthProvider> 
      <UserLocationProvider>
        <VehicleProvider>
          <BatteryProvider>
            <MainContainer />
          </BatteryProvider>
        </VehicleProvider>
      </UserLocationProvider>
    </AuthProvider>
  );
};

export default App;
