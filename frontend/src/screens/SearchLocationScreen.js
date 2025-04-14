import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const SearchLocationScreen = ({ route, navigation }) => {
  const { type, start, destination } = route.params;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: text,
            format: "json",
            addressdetails: 1,
            limit: 5,
            countrycodes: "JO", // Restrict to Jordan
          },
          headers: {
            "Accept-Language": "en,ar", // English first, then Arabic
            "User-Agent": "ElectraCar/1.0 (contact@electracar.com)", // Replace with your details
          },
        }
      );

      setResults(res.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleSelectLocation = (item) => {
    console.log("Selected location:", item);
    if (type === "start") {
      navigation.navigate("Trips", { start: item, destination });
    } else {
      navigation.navigate("Trips", { start, destination: item });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={`Search ${
          type === "start" ? "Start" : "Destination"
        } Point`}
        value={query}
        onChangeText={handleSearch}
        style={styles.input}
      />

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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  resultItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
});

export default SearchLocationScreen;
