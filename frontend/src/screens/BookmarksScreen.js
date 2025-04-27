import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 60) / 2; // Account for padding and margin
const cardImages = [
  require("../../assets/images/bookmarksImage/card1.jpg"),
  require("../../assets/images/bookmarksImage/card2.jpeg"),
  require("../../assets/images/bookmarksImage/card3.jpg"),
  require("../../assets/images/bookmarksImage/card4.jpg"),
  require("../../assets/images/bookmarksImage/card5.jpg"),
  require("../../assets/images/bookmarksImage/card6.jpg"),
  require("../../assets/images/bookmarksImage/card7.jpg"),
  require("../../assets/images/bookmarksImage/card8.jpg"),
  require("../../assets/images/bookmarksImage/card9.jpg"),
  require("../../assets/images/bookmarksImage/card10.jpg"),
];

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
        { id: "4", title: "Evening Chill" },
        { id: "5", title: "Sunset Drive" },
      ].map((item, index) => ({
        ...item,
        image: cardImages[index % cardImages.length],
      }));
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
          <Text style={styles.title}>
            Find Your Bookmarked trips here easily
          </Text>
          <Text style={styles.subtitle}>No bookmarks yet.</Text>
          <Text style={styles.subtitle}>Start adding!</Text>
        </View>
      ) : (
        <FlatList
          key={"2-column"} // 💡 force remount when numColumns changes
          data={bookmarks}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 16 }}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleBookmarkPress(item.id)}
              style={styles.card}
            >
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
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
    color: "#000C66",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    color: "#555",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    width: CARD_WIDTH,
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1.5,
    marginHorizontal: CARD_MARGIN / 2,
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    textAlign: "center",
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default BookmarksScreen;
