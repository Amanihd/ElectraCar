import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomButton from "./CustomButton";
import MultiSelectModal from "./MultiSelectModal";
import { useTranslation } from "react-i18next";



const plugTypesOptions = [
  "CHAdeMO",
  "GB-T DC - GB/T 20234.3",
  "CCS (Type 2)",
  "CCS (Type 1)",
  "Type 1 (J1772)",
  "Type 2 (Tethered Connector)",
  "Tesla (Model S/X)",
];

const BottomBar = ({
  userLocation,
  navigation,
  setFilterTypes,
  filterTypes,
}) => {
  const [plugTypeModalVisible, setPlugTypeModalVisible] = useState(false);
  const [selectedPlugTypes, setSelectedPlugTypes] = useState([]);
  const { t } = useTranslation();


  const toggleFilter = (filter) => {
    setFilterTypes((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  const togglePlugTypeSelection = (type) => {
    setSelectedPlugTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handlePlugTypeDone = () => {
    setPlugTypeModalVisible(false);

    setFilterTypes((prev) => {
      // Remove any existing plugType filter
      const newFilters = prev.filter((type) => type.filter !== "plugType");

      if (selectedPlugTypes.length > 0) {
        // Add updated plugType filter object
        return [...newFilters, { filter: "plugType", selectedPlugTypes }];
      } else {
        // No plug types selected → return only the other filters
        return newFilters;
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.viewContent}
      >
        <CustomButton
          iconName="search"
          label={t('search')}
          onPress={() => navigation.navigate("SearchStation", { userLocation })}
        />
        <CustomButton
          iconName="checkmark-circle"
          label={t("available")}
          selected={filterTypes.includes("available")}
          onPress={() => toggleFilter("available")}
        />
        <CustomButton
          iconName="charging-station"
          label={t("two_plus_chargers")}
          selected={filterTypes.includes("2plus")}
          onPress={() => toggleFilter("2plus")}
          useFontAwesome
        />
        <CustomButton
          iconName="bolt"
          label={t("fast")}
          selected={filterTypes.includes("fast")}
          onPress={() => toggleFilter("fast")}
          useFontAwesome
        />
        <CustomButton
          iconName="car"
          label={t("parking")}
          selected={filterTypes.includes("parking")}
          onPress={() => toggleFilter("parking")}
        />
        <CustomButton
          iconName="plug"
          label={t("plug_type")}
          selected={selectedPlugTypes.length > 0}
          onPress={() => setPlugTypeModalVisible(true)}
          useFontAwesome
        />
      </ScrollView>

      {/* Reusable MultiSelect Modal for Plug Types */}
      <MultiSelectModal
        visible={plugTypeModalVisible}
        onClose={() => setPlugTypeModalVisible(false)}
        options={plugTypesOptions}
        selectedItems={selectedPlugTypes}
        toggleItemSelection={togglePlugTypeSelection}
        onDone={handlePlugTypeDone}
        title={t("select_plug_type")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  viewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default BottomBar;
