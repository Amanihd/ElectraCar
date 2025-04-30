import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const TrackingButton = ({ isTracking, onPress }) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isTracking ? "#00A86B" : "#fff" },
      ]}
    >
      <Text style={{ color: isTracking ? "#fff" : "#000", fontWeight: "bold" }}>
        {isTracking ? t("stop_tracking") : t("start_tracking")}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 4,
    zIndex: 999,
  },
});

export default TrackingButton;
