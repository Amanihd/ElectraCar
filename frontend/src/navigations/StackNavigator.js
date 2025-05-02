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
  return (
    <Stack.Navigator >
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
          headerTitle: t("Join_screen"),
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
          headerTitle: t("add_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Make"
        component={MakeScreen}
        options={{
          headerTitle:t("make_screen") ,
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Model"
        component={ModelScreen}
        options={{
          headerTitle: t("model_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Trim"
        component={TrimScreen}
        options={{
          headerTitle: t("trim_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="Vehicle Summary"
        component={VehicleSummaryScreen}
        options={{
          headerTitle: t("vehicle_summary_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="VehiclePickScreen"
        component={VehiclePickScreen}
        options={{
          headerTitle: t("picK_vehicle_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ManageVehiclesScreen"
        component={ManageVehiclesScreen}
        options={{
          headerTitle: t("manage_vehicles_screen"),
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
          headerTitle: t("sign_up_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: t("sign_in"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: t("forgot_password"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          headerTitle: t("reset_password_screen"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerTitle: t("my_profile_screens"),
          headerStyle: { backgroundColor: "#000C66" },
          headerTintColor: "white",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
