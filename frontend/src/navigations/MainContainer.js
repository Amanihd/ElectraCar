import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import TripsScreen from "../screens/TripsScreen";
import BookmarksScreen from "../screens/BookmarksScreen";
import MeScreen from "../screens/MeScreen";
import ChargingStationDetails from "../screens/ChargingStationDetailsScreen";
import DirectionsScreen from "../screens/DirectionsScreen";

// Screen Names
const homeName = "Map";
const tripsName = "Trips";
const bookmarksName = "Bookmarks";
const meName = "Me";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === homeName) iconName = focused ? "map" : "map-outline";
        else if (route.name === tripsName)
          iconName = focused ? "car" : "car-outline";
        else if (route.name === bookmarksName)
          iconName = focused ? "bookmark" : "bookmark-outline";
        else if (route.name === meName)
          iconName = focused ? "person-circle" : "person-circle-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#000C66",
      tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
      tabBarStyle: { padding: 10, height: 60 },
    })}
  >
    <Tab.Screen
      name={homeName}
      component={HomeScreen}
      options={{
        headerStyle: { backgroundColor: "#000C66" }, // Set header background color to blue
        headerTintColor: "white", // Set title text color to white
      }}
    />
    <Tab.Screen
      name={tripsName}
      component={TripsScreen}
      options={{
        headerStyle: { backgroundColor: "#000C66" }, // Set header background color to blue
        headerTintColor: "white", // Set title text color to white
      }}
    />
    <Tab.Screen
      name={bookmarksName}
      component={BookmarksScreen}
      options={{
        headerStyle: { backgroundColor: "#000C66" }, // Set header background color to blue
        headerTintColor: "white", // Set title text color to white
      }}
    />
    <Tab.Screen
      name={meName}
      component={MeScreen}
      options={{
        headerStyle: { backgroundColor: "#000C66" }, // Set header background color to blue
        headerTintColor: "white", // Set title text color to white
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MainTabs"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ChargingStationDetails"
      component={ChargingStationDetails}
      options={() => ({
        headerShown: false,
        headerTitle: "",
        headerStyle: { backgroundColor: "transparent" },
      })}
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
  </Stack.Navigator>
);

// 🔹 Final Navigation Container
const MainContainer = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default MainContainer;
