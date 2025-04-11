import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChargingStationDetails from "../screens/ChargingStationDetailsScreen";
import DirectionsScreen from "../screens/DirectionsScreen";
import JoinScreen from "../screens/JoinScreen";
import FAQScreen from "../screens/FAQScreen";
import TermsOfUseScreen from "../screens/TermsOfUseScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SupportScreen from "../screens/SupportScreen";
import SearchStationScreen from "../screens/SearchStationScreen";
import AllFiltersScreen from "../screens/AllFiltersScreen";

//Add vehicle which is inside Me Screen
import AddVehicleScreen from "../screens/AddVehicleScreen";
import MakeScreen from "../screens/MakeScreen";
import ModelScreen from "../screens/ModelScreen";
import TrimScreen from "../screens/TrimScreen";
import VehicleSummaryScreen from "../screens/VehicleSummaryScreen";
import VehiclePickScreen from "../screens/VehiclePickScreen";
import ManageVehiclesScreen from "../screens/ManageVehiclesScreen";

const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChargingStationDetails"
      component={ChargingStationDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DirectionsScreen"
      component={DirectionsScreen}
      options={{
        headerTitle: "Directions",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="Join"
      component={JoinScreen}
      options={{
        headerTitle: "Join",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="FAQ"
      component={FAQScreen}
      options={{
        headerTitle: "FAQ",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="Support"
      component={SupportScreen}
      options={{
        headerTitle: "Support",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="TermsOfUse"
      component={TermsOfUseScreen}
      options={{
        headerTitle: "Terms of Use",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="PrivacyPolicy"
      component={PrivacyPolicyScreen}
      options={{
        headerTitle: "Privacy Policy",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="SearchStation"
      component={SearchStationScreen}
      options={{
        headerTitle: "Search Station",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}
    />
    <Stack.Screen
      name="AllFilters"
      component={AllFiltersScreen}
      options={{
        headerTitle: "All Filters",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
      }}/>

      
{/*all about vehicles*/}

      <Stack.Screen
  name="AddVehicle"
  component={AddVehicleScreen}
  options={{
    headerTitle: "Add Vehicle",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
  <Stack.Screen
  name="Make"
  component={MakeScreen}
  options={{
    headerTitle: "Make",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
  <Stack.Screen
  name="Model"
  component={ModelScreen}
  options={{
    headerTitle: "Model",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
    />
    <Stack.Screen
  name="Trim"
  component={TrimScreen}
  options={{
    headerTitle: "Trim",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
   <Stack.Screen
  name="Vehicle Summary"
  component={VehicleSummaryScreen}
  options={{
    headerTitle: "Vehicle Summary",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
  <Stack.Screen
  name="VehiclePickScreen"
  component={VehiclePickScreen}
  options={{
    headerTitle: "Vehicles",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
  <Stack.Screen
  name="ManageVehiclesScreen"
  component={ManageVehiclesScreen}
  options={{
    headerTitle: "Manage Vehicles",
    headerStyle: { backgroundColor: "#000C66" },
    headerTintColor: "white",
  }}
  />
  </Stack.Navigator>
);

export default StackNavigator;
