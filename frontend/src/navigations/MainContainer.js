// MainContainer.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";

const MainContainer = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainContainer;
