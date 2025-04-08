// TabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import TripsScreen from "../screens/TripsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import MeScreen from "../screens/MeScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Map") iconName = focused ? "map" : "map-outline";
        else if (route.name === "Trips") iconName = focused ? "car" : "car-outline";
        else if (route.name === "Bookmarks") iconName = focused ? "bookmark" : "bookmark-outline";
        else if (route.name === "Me") iconName = focused ? "person-circle" : "person-circle-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#000C66",
      tabBarInactiveTintColor: "gray",
      headerStyle: { backgroundColor: '#000C66' }, // Ensure header background is set here
      headerTintColor: 'white',  // Ensure the header text is white
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
      tabBarStyle: { padding: 10, height: 60 },
    })}
  >
    <Tab.Screen name="Map" component={HomeScreen} />
    <Tab.Screen name="Trips" component={TripsScreen} />
    <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
    <Tab.Screen name="Me" component={MeScreen} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
