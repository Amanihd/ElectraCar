// TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import TripsScreen from "../screens/TripsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import MeScreen from "../screens/MeScreen";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";
import CustomHeader from "../components/CustomHeader";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
  const fontSemiBold = isRTL ? "IBM-SemiBold" : "System";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Map") iconName = focused ? "map" : "map-outline";
          else if (route.name === "Trips")
            iconName = focused ? "car" : "car-outline";
          else if (route.name === "Bookmarks")
            iconName = focused ? "bookmark" : "bookmark-outline";
          else if (route.name === "Me")
            iconName = focused ? "person-circle" : "person-circle-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#000C66",
        tabBarInactiveTintColor: "gray",
        headerStyle: { backgroundColor: "#000C66" },
        headerTintColor: "white",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 12,
          fontFamily: fontSemiBold, 
        },
        headerTitleStyle: {
          fontFamily: fontSemiBold, 
        },
        tabBarStyle: { padding: 10, height: 100 },//for new update
      })}
    >
      <Tab.Screen
        name="Map"
        component={HomeScreen}
      
        options={{
          header: () => <CustomHeader titleKey="map" isArrow={false}/>, 
          tabBarLabel: t("map"),
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          header: () => <CustomHeader titleKey="trips" isArrow={false}/>, 
          tabBarLabel: t("trips"),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          header: () => <CustomHeader titleKey="bookmarks" isArrow={false}/>, 
          tabBarLabel: t("bookmarks"),
        }}
      />
      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          header: () => <CustomHeader titleKey="me" isArrow={false}/>,
          tabBarLabel: t("me"),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
