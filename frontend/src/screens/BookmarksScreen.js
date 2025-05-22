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
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 60) / 2;

const BookmarksScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Join");
    } else {
      const mockData = [
        { id: "1", title: "Trip to home" },
        { id: "2", title: "Office Route" },
        { id: "3", title: "Weekend" },
        { id: "4", title: "Park" },
        { id: "5", title: "Uni" },
      ];
      setBookmarks(mockData);
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleBookmarkPress = (tripId) => {
    navigation.navigate("TripMap", {
      start: { lat: 31.9815471, lng: 35.9434113 },
      streets: [{ lat: 31.9824522, lng: 35.9412327 }],
      destination: { lat: 31.97, lng: 35.94 },
    });
  };

  const handleRemoveBookmark = (tripId) => {
    setBookmarks((prev) => prev.filter((item) => item.id !== tripId));
    // Later: also send request to backend to delete
  };

  if (loading) return null;

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
          <Text style={[styles.title, arFontFamilySmiBold]}>
            {t("bookmark_title")}
          </Text>
          <Text style={[styles.subtitle, arFontFamilyRegular]}>
            {t("no_bookmarks")}
          </Text>
          <Text style={[styles.subtitle, arFontFamilyRegular]}>
            {t("start_adding_bookmark")}
          </Text>
        </View>
      ) : (
        <FlatList
          key={"2-column"}
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
              <Image
                source={require("../../assets/images/bookmark-banner.jpg")}
                style={styles.imageBox}
                resizeMode="cover"
              />
              <Text style={[styles.cardTitle, arFontFamilySmiBold]}>
                {item.title}
              </Text>
              <TouchableOpacity onPress={() => handleRemoveBookmark(item.id)}>
                <Text style={[styles.removeText, arFontFamilyRegular]}>
                  {t("remove")}
                </Text>
              </TouchableOpacity>
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1.5,
    marginHorizontal: CARD_MARGIN / 2,
    overflow: "hidden",
    paddingBottom: 8,
  },
  imageBox: {
    width: "100%",
    height: "55%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 8,
  },
  removeText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default BookmarksScreen;
