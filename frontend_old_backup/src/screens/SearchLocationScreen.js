import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";
import { TripContext } from "../context/TripContext";


const SearchLocationScreen = ({ route, navigation }) => {
  const { type, start, destination } = route.params;
   const { setStart, setDestination } = useContext(TripContext);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const isRTL = i18next.language === "ar";

  const rtlTextAlign = { textAlign: isRTL ? "right" : "left" };
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  const handleSubmitSearch = async () => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
            countrycodes: "JO",
          },
          headers: {
            "Accept-Language": "en,ar",
            "User-Agent": "ElectraCar/1.0 (contact@electracar.com)",
          },
        }
      );

      setResults(res.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (item) => {
    if (type === "start") {
      setStart(item);
    } else {
      setDestination(item);
    }
    navigation.goBack();  // ترجع للشاشة السابقة
  
    // if (type === "start") {
    //   navigation.navigate("MainTabs", {
    //     screen: "Trips",
    //     params: { start: item, destination },
    //   });
    // } else {
    //   navigation.navigate("MainTabs", {
    //     screen: "Trips",
    //     params: { start, destination: item },
    //   });
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder={
            type === "start"
              ? t("search_start_point")
              : t("search_destination_point")
          }
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSubmitSearch}
          returnKeyType="search"
          style={[styles.input, arFontFamilyRegular]}
        />
        <TouchableOpacity
          onPress={handleSubmitSearch}
          style={styles.iconContainer}
        >
          <Ionicons name="search" size={24} color="#000C66" />
        </TouchableOpacity>
      </View>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#000C66"
          style={{ marginBottom: 15 }}
        />
      )}

      <FlatList
        data={results}
        keyExtractor={(item) => item.place_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleSelectLocation(item)}
            style={styles.resultItem}
          >
            <Text>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    marginRight: 10,
  },
  iconContainer: {
    backgroundColor: "#E1E6F2",
    padding: 10,
    borderRadius: 8,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
});

export default SearchLocationScreen;
