
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "../../services/i18next";

const TrackingButton = ({ isTracking, onPress }) => {
  const { t } = useTranslation();

  const isRTL = i18next.language === "ar";
  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };
  

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: isTracking ? "#00A86B" : "#fff" },
      ]}
    >
      <Text
       style={{
        color: isTracking ? "#fff" : "#000",
        ...(arFontFamilySmiBold),
      }}
      >
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
