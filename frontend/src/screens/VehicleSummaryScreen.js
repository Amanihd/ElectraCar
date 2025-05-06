import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import VehicleButton from '../components/VehicleButton';
import { VehicleContext } from '../context/VehicleContext';

const VehicleSummaryScreen = () => {
  const { make, model, trim } = useRoute().params;
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const { addVehicle, setSelectedVehicle } = useContext(VehicleContext);

  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const textAlignmentStyle = isRTL ? styles.rtlText : styles.ltrText;

  const handleAddVehicle = () => {
    const newVehicle = { make, model, trim };
    addVehicle(newVehicle);
    setSelectedVehicle(newVehicle);
    navigation.navigate('VehiclePickScreen');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/images/vehicle.json')}
        style={styles.animation}
        autoPlay
        loop
      />

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${make} :${t('vehicle_summary.make')}`
          : `${t('vehicle_summary.make')}: ${make}`}
      </Text>

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${model} :${t('vehicle_summary.model')}`
          : `${t('vehicle_summary.model')}: ${model}`}
      </Text>

      <Text style={[styles.summaryText, textAlignmentStyle, arabicTextStyle]}>
        {isRTL
          ? `${trim} :${t('vehicle_summary.trim')}`
          : `${t('vehicle_summary.trim')}: ${trim}`}
      </Text>

      <VehicleButton 
        label={t('vehicle_summary.add_vehicle')} 
        onPress={handleAddVehicle}
        isRTL={isRTL}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  animation: {
    width: 400,
    height: 300,
    alignSelf: 'center',
  },
  summaryText: {
    fontSize: 18,
    marginVertical: 8,
    color: '#000',
  },
  ltrText: {
    textAlign: 'left',
  },
  rtlText: {
    textAlign: 'right',
  },
  arabicText: {
    fontFamily: 'IBM-Regular',
    fontWeight: undefined,
  },
});

export default VehicleSummaryScreen;
