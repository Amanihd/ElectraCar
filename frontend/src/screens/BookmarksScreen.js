import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LottieView from "lottie-react-native";

const BookmarksScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Join");
    } else {
      const mockData = [
        { id: "1", title: "Trip to Downtown" },
        { id: "2", title: "Morning Office Route" },
        { id: "3", title: "Weekend Adventure" },
      ];
      setBookmarks(mockData);
    }
  }, [isLoggedIn]);

  const handleBookmarkPress = (tripId) => {
    navigation.navigate("TripMap", { tripId });
  };

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <LottieView
            source={require("../../assets/images/MapTrip.json")}
            style={styles.animation}
            autoPlay
            loop
          />
          <Text style={styles.title}>My Bookmarked Trips</Text>
          <Text style={styles.subtitle}>
            No bookmarks yet. Start exploring!
          </Text>
        </View>
      ) : (
        <>
          <LottieView
            source={require("../../assets/images/MapTrip.json")}
            style={styles.animation}
            autoPlay
            loop
          />
          <Text style={styles.title}>My Bookmarked Trips</Text>
          <Text style={styles.subtitle}>find your road easily</Text>
          <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 2 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleBookmarkPress(item.id)}
                style={styles.card}
              >
                <Text style={styles.cardTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  animation: {
    width: 300,
    height: 150,
    alignSelf: "center",
  },
  title: {
    textAlign: "center",

    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000C66",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1.5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "500",
    color: "#111827",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default BookmarksScreen;
