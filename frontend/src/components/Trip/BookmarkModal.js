import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTranslation } from "react-i18next";

const BookmarkModal = ({ visible, onSave }) => {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons
          name="bookmark"
          size={20}
          color="red"
          style={{ marginBottom: 15 }}
        />
       <Text style={styles.title}>{t("add_to_bookmarks")}</Text>
       <Text style={styles.text}>{t("bookmark_trip_message")}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => onSave(true)}>
            <Text style={styles.buttonText}>{t("yes")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={() => onSave(false)}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>{t("no")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxWidth: 320,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#000C66" },
  text: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: "#000C66",
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default BookmarkModal;
