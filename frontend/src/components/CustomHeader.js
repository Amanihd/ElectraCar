
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18next from "../services/i18next";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = ({
  titleKey,
  isArrow = true,
  headerShown = true,
  fromVehicleModal = false,
  goHomeOnBack = false,
}) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isRTL = i18next.language === "ar";

  return (
    <View
      style={[
        styles.headerContainer,
        { flexDirection: isRTL ? "row-reverse" : "row" }, 
      ]}
    >
      {isArrow && (
        <TouchableOpacity
          onPress={() => {
            if (goHomeOnBack) {
              navigation.navigate("MainTabs", { screen: "Home" });
            } else if (fromVehicleModal) {
              navigation.navigate("MainTabs", { screen: "Trips" });
            } else {
              navigation.goBack();
            }
          }}
        >
          <Ionicons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      )}

      {headerShown && (
        <Text
          style={[
            styles.headerText,
            {
              fontFamily: isRTL ? "IBM-SemiBold" : "System",
              textAlign: isRTL ? "right" : "left",
              marginLeft: isRTL ? 0 : 16,
              marginRight: isRTL ? 16 : 0,
            },
          ]}
        >
          {t(titleKey)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 85,
    backgroundColor: "#000C66",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
});

export default CustomHeader;
