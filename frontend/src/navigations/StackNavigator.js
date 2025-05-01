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

// Add vehicle which is inside Me Screen
import AddVehicleScreen from "../screens/AddVehicleScreen";
import MakeScreen from "../screens/MakeScreen";
import ModelScreen from "../screens/ModelScreen";
import TrimScreen from "../screens/TrimScreen";
import VehicleSummaryScreen from "../screens/VehicleSummaryScreen";
import VehiclePickScreen from "../screens/VehiclePickScreen";
import ManageVehiclesScreen from "../screens/ManageVehiclesScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";
import TripsScreen from "../screens/TripsScreen";

// All about Sign a user
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import TripMapScreen from "../screens/TripMapScreen";

import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
  const fontFamily = isRTL ? "IBM-SemiBold" : "System";

  return (
    <Stack.Navigator screenOptions={{
      
      headerTitleStyle: {
        fontFamily,
      },
    }} >
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Map",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
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
          headerTitle: t("directions"),
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
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          headerTitle: t("faq"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerTitle: t("support"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={{
          headerTitle: t("termsOfUse"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerTitle: t("privacyPolicy"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SearchStation"
        component={SearchStationScreen}
        options={{
          headerTitle: t("search_station"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />

      {/* All about vehicles */}
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
      {/* For trips screen */}
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocationScreen}
        options={{
          headerTitle: t("search"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Trips"
        component={TripsScreen}
        
        options={{
          headerTitle: t("trips"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="TripMap"
        component={TripMapScreen}
        options={{
          headerTitle: t("my_trip"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      {/* All about sign up, auth, sign in, join */}
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: "Sign Up",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: "Sign In",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: "Forgot Password",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          headerTitle: "Reset Password",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerTitle: "My Profile",
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
