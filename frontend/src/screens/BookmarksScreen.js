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
import axios from "axios";
import Toast from "react-native-root-toast";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 60) / 2;

const BookmarksScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLoggedIn, token } = useContext(AuthContext);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  const handleBookmarkPress = async (tripId) => {
    try {
      const response = await axios.get(
        `https://d650-91-186-254-248.ngrok-free.app/api/bookmarks/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const item = response.data;

      const start = { lat: item.sourceLat, lng: item.sourceLon };
      const destination = {
        lat: item.destinationLat,
        lng: item.destinationLon,
      };

      const streets = item.path.map((p) => ({
        lat: p.lat,
        lng: p.lon,
      }));
      const totalDistanceKm = item.totalDistanceKm;
      const estimatedTimeMinutes = item.estimatedTimeMinutes;
      
      navigation.navigate("TripMap", {
        start,
        streets,
        destination,
        totalDistanceKm,
        estimatedTimeMinutes,
      });
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn) {
        const fetchSelectedBookmarks = async () => {
          setLoading(true);
          try {
            const response = await axios.get(
              "https://d650-91-186-254-248.ngrok-free.app/api/bookmarks",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const data = response.data;

            const formatted = data.map((item) => ({
              id: item.id.toString(),
              title: item.bookmarkName,
              start: { lat: item.sourceLat, lng: item.sourceLon },
              destination: {
                lat: item.destinationLat,
                lng: item.destinationLon,
              }, // fix typo destinalonLon -> destinationLon
              streets: item.path.map((p) => ({ lat: p.lat, lng: p.lon })),
            }));
            setBookmarks(formatted);
          } catch (error) {
            console.error("Error fetching selected bookmarks:", error);
            setBookmarks([]);
          } finally {
            setLoading(false);
          }
        };

        fetchSelectedBookmarks();
      } else {
        navigation.navigate("Join");
      }
    }, [isLoggedIn, token, navigation])
  );

  const handleRemoveBookmark = async (tripId) => {
    try {
      await axios.delete(
        `https://d650-91-186-254-248.ngrok-free.appp/api/bookmarks/${tripId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookmarks((prev) => prev.filter((item) => item.id !== tripId));

      Toast.show(t("bookmark_removed"), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true,
        backgroundColor: "#333",
        textColor: "#fff",
        opacity: 0.9,
        containerStyle: {
          borderRadius: 5,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 60, // <-- moves toast up a bit from the bottom
        },
        textStyle: {
          fontWeight: "500",
          fontSize: 14,
        },
      });
    } catch (error) {
      console.error("❌ Error removing bookmark:", error);
    }
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
