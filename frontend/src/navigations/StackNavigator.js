
import { createStackNavigator } from "@react-navigation/stack";
import ChargingStationDetails from "../screens/ChargingStationDetailsScreen";

import JoinScreen from "../screens/JoinScreen";
import FAQScreen from "../screens/FAQScreen";
import TermsOfUseScreen from "../screens/TermsOfUseScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import SupportScreen from "../screens/SupportScreen";
import SearchStationScreen from "../screens/SearchStationScreen";


import AddVehicleScreen from "../screens/AddVehicleScreen";
import MakeScreen from "../screens/MakeScreen";
import ModelScreen from "../screens/ModelScreen";
import TrimScreen from "../screens/TrimScreen";
import VehicleSummaryScreen from "../screens/VehicleSummaryScreen";
import VehiclePickScreen from "../screens/VehiclePickScreen";
import ManageVehiclesScreen from "../screens/ManageVehiclesScreen";
import SearchLocationScreen from "../screens/SearchLocationScreen";


import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import TripMapScreen from "../screens/TripMapScreen";

import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

import CustomHeader from "../components/CustomHeader";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
  const fontFamily = isRTL ? "IBM-SemiBold" : "System";

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily,
        },
      }}
    >
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
        name="Join"
        component={JoinScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader titleKey="Join_screen" goHomeOnBack={true} />
          ),
        })}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          header: () => <CustomHeader titleKey="faq" />, 
        }}
      />
      <Stack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          header: () => <CustomHeader titleKey="support" />, 
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={{
          header: () => <CustomHeader titleKey="termsOfUse" />, 
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          header: () => <CustomHeader titleKey="privacyPolicy" />, 
        }}
      />
      <Stack.Screen
        name="SearchStation"
        component={SearchStationScreen}
        options={{
          header: () => <CustomHeader titleKey="search_station" />, 
        }}
      />

    
      <Stack.Screen
        name="AddVehicle"
        component={AddVehicleScreen}
        options={{
          header: () => <CustomHeader titleKey="add_screen" isArrow={false} />,
        }}
      />

      <Stack.Screen
        name="Make"
        component={MakeScreen}
        options={{
          header: () => <CustomHeader titleKey="make_screen" />,
        }}
      />
      <Stack.Screen
        name="Model"
        component={ModelScreen}
        options={{
          header: () => <CustomHeader titleKey="model_screen" />,
        }}
      />
      <Stack.Screen
        name="Trim"
        component={TrimScreen}
        options={{
          header: () => <CustomHeader titleKey="trim_screen" />,
        }}
      />
      <Stack.Screen
        name="Vehicle Summary"
        component={VehicleSummaryScreen}
        options={{
          header: () => <CustomHeader titleKey="vehicle_summary_screen" />,
        }}
      />
      <Stack.Screen
        name="VehiclePickScreen"
        component={VehiclePickScreen}
        options={({ route }) => ({
          header: () => (
            <CustomHeader
              titleKey="picK_vehicle_screen"
              fromVehicleModal={route?.params?.fromVehicleModal}
            />
          ),
        })}
      />

      <Stack.Screen
        name="ManageVehiclesScreen"
        component={ManageVehiclesScreen}
        options={{
          header: () => <CustomHeader titleKey="manage_vehicles_screen" />,
        }}
      />
     
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocationScreen}
        options={{
          header: () => <CustomHeader titleKey="search" />,
        }}
      />

      <Stack.Screen
        name="TripMap"
        component={TripMapScreen}
        options={{
          header: () => <CustomHeader titleKey="my_trip" />,
        }}
      />

    
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          header: () => <CustomHeader titleKey="sign_up_screen" />,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          header: () => <CustomHeader titleKey="sign_in" />,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          header: () => <CustomHeader titleKey="forgot_password" />,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          header: () => <CustomHeader titleKey="reset_password_screen" />,
        }}
      />

      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          header: () => <CustomHeader titleKey="my_profile_screens" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
