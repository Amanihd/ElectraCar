import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const BatteryLevelModal = ({ visible, batteryLevel, onValueChange, onContinue }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Battery Level</Text>
        <Text style={styles.text}>{batteryLevel}% charged</Text>

        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={batteryLevel}
          minimumTrackTintColor="#000C66"
          maximumTrackTintColor="#ccc"
          onValueChange={onValueChange}
        />
        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={styles.continue} onPress={onContinue}>
            Continue
          </Text>
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
  text: { fontSize: 16, marginVertical: 20, color: "#333" },
  continue: {
    backgroundColor: "#000C66",
    color: "#fff",
    textAlign: "center",
    padding: 12,
    borderRadius: 10,
    fontWeight: "bold",
  },
});

export default BatteryLevelModal;
