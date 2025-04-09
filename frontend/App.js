import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import MainContainer from "./src/navigations/MainContainer";

const App = () => {
  useEffect(() => {
    // Set the StatusBar style to light content (white icons and text)
    StatusBar.setBarStyle("light-content");
    // Set the background color of the StatusBar to dark blue
    StatusBar.setBackgroundColor("#000C66"); // Dark blue color
  }, []);

  return <MainContainer />;
};

export default App;
