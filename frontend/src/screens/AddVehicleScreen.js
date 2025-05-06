import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';

const AddVehicleScreen = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  //Arabic style(IBM)
  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const arabicTitleStyle = isRTL ? styles.arabicTitle : {};
  const arabicButtonTextStyle = isRTL ? styles.arabicButtonText : {};

  return (
    <View style={styles.container}>
      <Text style={[styles.title, arabicTitleStyle]}>
        {t('add_vehicle_screen.title')}
      </Text>

      <LottieView
        source={require("../../assets/images/vehicle.json")}
        style={styles.animation}
        autoPlay
        loop
      />

      <Text style={[styles.subtitle, arabicTextStyle]}>
        {t('add_vehicle_screen.subtitle')}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Make')}
      >
        <Text style={[styles.buttonText, arabicButtonTextStyle]}>
          {t('add_vehicle_screen.add_vehicle')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Me' })}>
        <Text style={[styles.link, arabicTextStyle]}>
          {t('add_vehicle_screen.add_later')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    justifyContent: 'center',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16
  },
  arabicTitle: {
    fontFamily: 'IBM-SemiBold',
    fontSize:32,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#555'
  },
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  arabicButtonText: {
    fontFamily: 'IBM-SemiBold',
    fontWeight: undefined, 
  },
  link: {
    color: '#0033A0',
    marginTop: 12,
    fontSize: 14
  },
  arabicText: {
    fontFamily: 'IBM-Regular',
    fontWeight: undefined, 
  },
  animation: {
    width: 400,
    height: 300,
    alignSelf: 'center',
  },
});

export default AddVehicleScreen;



