import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import Slider from "@react-native-community/slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useNavigation } from "@react-navigation/native";

const AllFiltersScreen = () => {
  const navigation = useNavigation();

  const [plugScore, setPlugScore] = useState(0);
  const [kilowatt, setKilowatt] = useState([0, 350]);
  const [plugType, setPlugType] = useState("Type1");
  const [stationCount, setStationCount] = useState("Any");
  const [parking, setParking] = useState(false);
  const [amenities, setAmenities] = useState({
    wifi: false,
    restroom: false,
    food: false,
  });

  const stationCountOptions = ["Any", "2+", "4+", "6+"];
  const plugTypesOptions = [
    "Type1",
    "Type2",
    "CCS",
    "CHAdeMO",
    "Tesla",
    "Mennekes",
    "GB/T AC",
    "GB/T DC",
    "Supercharger",
    "Combo1",
    "Combo2",
    "J1772",
    "SCAME",
    "Wall",
    "3-pin",
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {/* Plug Score Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.label}>Plug Score: {plugScore}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={plugScore}
          onValueChange={setPlugScore}
          thumbTintColor="#000C66"
          minimumTrackTintColor="#000C66"
        />
      </View>

      {/* Kilowatt Range Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.label}>
          Kilowatt Range: {kilowatt[0]} - {kilowatt[1]}
        </Text>
        <View style={styles.sliderContainer}>
          <MultiSlider
            values={kilowatt}
            onValuesChange={setKilowatt}
            min={0}
            max={350}
            step={1}
            sliderLength={300}
            selectedStyle={styles.sliderSelected}
            markerStyle={styles.sliderMarker}
          />
        </View>
      </View>

    
      <View style={styles.filterSection}>
        <Text style={styles.label}>Vehicle</Text>
        <View style={styles.buttonWrapper}>
          <Button
            title="ADD VEHICLE"
            color="#000C66"
            onPress={() => navigation.navigate("ADD")}
          />
        </View>
      </View>

     
      <View style={styles.filterSection}>
        <Text style={styles.label}>Plug Type</Text>
        <View style={styles.optionContainer}>
          {plugTypesOptions.map((type) => (
            <Pressable
              key={type}
              onPress={() => setPlugType(type)}
              style={[
                styles.option,
                plugType === type && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  plugType === type && styles.selectedText,
                ]}
              >
                {type}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

     
      <View style={styles.filterSection}>
        <Text style={styles.label}>Station Count</Text>
        <View style={styles.optionContainer}>
          {stationCountOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => setStationCount(option)}
              style={[
                styles.option,
                stationCount === option && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  stationCount === option && styles.selectedText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

     
      <View style={styles.filterSection}>
        <Text style={styles.label}>Amenities</Text>
        <View style={styles.optionContainer}>
          {Object.entries(amenities).map(([key, value]) => (
            <Pressable
              key={key}
              onPress={() =>
                setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))
              }
              style={[styles.option, value && styles.selectedOption]}
            >
              <Text style={[styles.optionText, value && styles.selectedText]}>
                {key}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

    
      <View style={styles.filterSection}>
        <Text style={[styles.label, styles.parkingLabel]}>
          Parking Available
        </Text>
        <Pressable
          onPress={() => setParking(!parking)}
          style={[styles.option, parking && styles.selectedOption]}
        >
          <Text style={[styles.optionText, parking && styles.selectedText]}>
            {parking ? "✓ Yes" : "No"}
          </Text>
        </Pressable>
      </View>

     
      <View style={styles.buttonWrapper}>
        <Button
          title="APPLY FILTER"
          color="#000C66"
          onPress={() => navigation.navigate("apply")}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  parkingLabel: {
    marginBottom: 10, // Add space between label and button
  },
  slider: {
    width: "100%",
    marginTop: 10,
  },
  sliderContainer: {
    alignItems: "center", 
    justifyContent: "center", 
    width: "100%", 
    marginTop: 10,
  },
  sliderSelected: {
    backgroundColor: "#000C66",
  },
  sliderMarker: {
    backgroundColor: "#000C66",
  },
  filterSection: {
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
  },
  option: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    minWidth: 60,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#ddd",
    borderColor: "#black",
  },
  optionText: {
    color: "#333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  selectedText: {
    color: "black",
  },
  buttonWrapper: {
    marginTop: 20,
  },
});

export default AllFiltersScreen;
