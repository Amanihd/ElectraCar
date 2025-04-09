import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";

const BottomBar = ({ userLocation }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.viewContent}>
        <CustomButton
          iconName="search"
          label="Search"
          onPress={() => navigation.navigate("SearchStation", { userLocation })}
        />
        <CustomButton
          iconName="options"
          label="All Filters"
          onPress={() => navigation.navigate("AllFilters")}
        />
        <CustomButton
          iconName="checkmark-circle"
          label="Available"
          onPress={() => console.log("Navigate to available")}
        />
        <CustomButton
          iconName="battery-charging"
          label="2+ Chargers"
          onPress={() => console.log("Navigate to chargers")}
        />
        <CustomButton
          iconName="speedometer"
          label="Fast"
          onPress={() => console.log("Navigate to fast")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10, 
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  viewContent: {
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center", 
  },
});

export default BottomBar;
