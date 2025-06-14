import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import stations from "../data/stations.json";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const SearchStationScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  const { userLocation } = route.params;
  const [query, setQuery] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = stations.filter((station) =>
      station.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStations(filtered);
  };

  const handleStationPress = (station) => {
    navigation.navigate("ChargingStationDetails", { station, userLocation }); // send station data to detail screen
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={t("search_for_station")}
        value={query}
        onChangeText={handleSearch}
        style={[styles.input,arFontFamilyRegular]}
      />

      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.result}
            onPress={() => handleStationPress(item)}
          >
            <Text style={styles.resultText}>{item.title}</Text>
            <Text style={styles.resultSub}>{item.address}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() =>
          query.length > 0 && (
            <Text style={styles.noResults}>{t("no_stations_found")}</Text>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  result: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resultSub: {
    fontSize: 14,
    color: "#666",
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
});

export default SearchStationScreen;
