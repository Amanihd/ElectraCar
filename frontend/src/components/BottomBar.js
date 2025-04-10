import React from "react";
import { View, StyleSheet } from "react-native";
import CustomButton from "./CustomButton";

const BottomBar = ({
  userLocation,
  navigation,
  setFilterTypes,
  filterTypes,
}) => {
  const toggleFilter = (filter) => {
    setFilterTypes((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter); // remove filter
      } else {
        return [...prevFilters, filter]; // add filter
      }
    });
  };

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
          selected={filterTypes.includes("available")} // Check if the filter is selected
          onPress={() => toggleFilter("available")}
        />
        <CustomButton
          iconName="battery-charging"
          label="2+ Chargers"
          selected={filterTypes.includes("2plus")} // Check if the filter is selected
          onPress={() => toggleFilter("2plus")}
        />
        <CustomButton
          iconName="speedometer"
          label="Fast"
          selected={filterTypes.includes("fast")} // Check if the filter is selected
          onPress={() => toggleFilter("fast")}
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
