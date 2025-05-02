import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { FontAwesome5 } from "react-native-vector-icons";
import i18next from "../services/i18next";

const CustomButton = ({ iconName, label, onPress, selected, useFontAwesome }) => {
  const isRTL = i18next.language === "ar";
  const arFontFamilyRegular = isRTL ? { fontFamily: "IBM-Regular" } : {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, selected && styles.selectedButton]}
        onPress={onPress}
      >
        {useFontAwesome ? (
          <FontAwesome5 name={iconName} size={20} color="#000C66" />
        ) : (
          <Ionicons name={iconName} size={25} color="#000C66" />
        )}
      </TouchableOpacity>
      <Text style={[styles.buttonText, selected && styles.selectedText,arFontFamilyRegular]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 35,
    marginRight: 17,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedButton: {
    backgroundColor: "#e7ebf7",
  },
  buttonText: {
    color: "gray",
    fontSize: 12,
    marginRight: 17,
  },
  selectedText: {
    fontWeight: "bold",
  },
});

export default CustomButton;
