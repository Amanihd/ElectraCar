import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useBookmarks } from "../context/BookmarksContext";

const BookmarksScreen = ({ navigation }) => {
  const { bookmarks } = useBookmarks();

  if (!bookmarks || bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Bookmarks Available</Text>
      </View>
    );
  }

  const handlePress = (station) => {
    navigation.navigate("ChargingStationDetails", { station });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)}>
      <View style={styles.bookmarkItem}>
        {/* Charging Station Icon */}
        <Ionicons
          name="battery-charging"
          size={35}
          color="green"
          style={styles.icon}
        />

        {/* Station Details */}
        <View>
          <Text style={styles.bookmarkTitle}>{item.AddressInfo.Title}</Text>
          <Text>{item.AddressInfo.AddressLine1}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  bookmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10, // Space only below each item
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  icon: {
    marginRight: 10,
  },
  bookmarkTitle: { fontSize: 16, fontWeight: "bold" },
});

export default BookmarksScreen;
