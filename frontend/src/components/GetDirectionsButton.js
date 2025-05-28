import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18next from '../services/i18next';

const GetDirectionsButton = ({ onPress }) => {
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar";

  const arFontFamilySmiBold = isRTL
    ? { fontFamily: "IBM-SemiBold" }
    : { fontWeight: "bold" };

  return (
    <TouchableOpacity style={[styles.button, styles.buttonMargin]} onPress={onPress}>
      <Text style={[styles.buttonText,arFontFamilySmiBold]}>{t('get_directions')}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "50%", 
    height: 60,
    alignSelf: "center",
    backgroundColor: "#003366", 
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  buttonMargin: {
    marginTop: 90, 
  },
});

export default GetDirectionsButton;
