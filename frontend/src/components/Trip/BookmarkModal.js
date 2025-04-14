import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const BookmarkModal = ({ visible, onSave }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Ionicons name="bookmark" size={20} color="red" style={{ marginBottom: 15 }} />
        <Text style={styles.title}>Add to Bookmarks?</Text>
        <Text style={styles.text}>Do you want to bookmark this trip for later?</Text>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => onSave(true)}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: "#ccc" }]} onPress={() => onSave(false)}>
            <Text style={[styles.buttonText, { color: "#000" }]}>No</Text>
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
