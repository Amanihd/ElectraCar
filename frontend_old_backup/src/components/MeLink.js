import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "react-native-vector-icons";

const MeLink = ({ title, icon, onPress, isRTL }) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <FontAwesome5
          name={icon}
          size={20}
          color="#000C66"
          style={styles.itemIcon} 
        />
        <Text
          style={[styles.itemText, isRTL && { fontFamily: "IBM-SemiBold" }]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MeLink;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 1.5,
  },
  itemIcon: {
    color: "#000C66",
    marginRight: 16,
    marginLeft:16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  section: {
    width: "90%",
  },
});
