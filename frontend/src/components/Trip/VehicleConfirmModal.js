import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const VehicleConfirmModal = ({ visible, vehicle, onYes, onNo }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Is this your vehicle?</Text>
        <Text style={styles.text}>
          {vehicle.make} - {vehicle.model} ({vehicle.trim})
        </Text>
        <View style={styles.buttons}>
          <Pressable style={styles.button} onPress={onYes}>
            <Text style={styles.buttonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, { backgroundColor: "#ccc" }]}
            onPress={onNo}
          >
            <Text style={[styles.buttonText, { color: "#000" }]}>No</Text>
          </Pressable>
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
  text: { fontSize: 16, marginVertical: 20, textAlign: "center", color: "#333" },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: "#000C66",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default VehicleConfirmModal;
