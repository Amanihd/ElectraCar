
import { Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const StationCount = ({ count }) => {
  const { t } = useTranslation();
  const language = i18next.language;

  const getStationText = (count, language) => {
    if (language === "ar") {
      if (count === 1) {
        return t("station"); // محطة
      } else if (count === 2) {
        return t("two_stations"); // محطتان
      } else if (count >= 3 && count <= 10) {
        return t("stations"); // محطات
      } else {
        return t("station"); // محطة بعد 11 وأعلى
      }
    } else {
      // اللغة الإنجليزية
      if (count === 1) {
        return t("station"); // station
      } else {
        return t("stations"); // stations
      }
    }
  };

  return (
    <Text style={styles.stationCount}>
      {count} {getStationText(count, language)}
    </Text>
  );
};

const styles = StyleSheet.create({
  stationCount: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    fontWeight: "bold",
    fontSize: 14,
    zIndex: 1,
  },
});

export default StationCount;
