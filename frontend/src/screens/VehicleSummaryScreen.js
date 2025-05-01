{/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';
import LottieView from "lottie-react-native";


const VehicleSummaryScreen = () => {
  const { make, model, trim } = useRoute().params;
  const navigation = useNavigation();

  const handleAddVehicle = () => {
    
    navigation.navigate('VehiclePickScreen');
  };

  return (
    <View style={styles.container}>
      <LottieView
              source={require("../../assets/images/vehicle.json")}
              style={styles.animation}
              autoPlay
              loop
             
            />
      
      <Text style={styles.text}>Make: {make}</Text>
      <Text style={styles.text}>Model: {model}</Text>
      <Text style={styles.text}>Trim: {trim}</Text>

      
      <VehicleButton label="Add This Vehicle" onPress={handleAddVehicle} />
    </View>
  );
};

export default VehicleSummaryScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000C66',
  },
  text: {
    fontSize: 18,
    marginVertical: 4,
  },
  animation: {
    width: 400,
    height: 300,
    alignSelf: 'center',
  },
  
});*/}
import React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import VehicleButton from '../components/VehicleButton';

const VehicleSummaryScreen = () => {
  const { make, model, trim } = useRoute().params;
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  const handleAddVehicle = () => {
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

      <Text style={styles.summaryText}>
        {isRTL
          ? `${make} :${t('vehicle_summary.make')}`
          : `${t('vehicle_summary.make')}: ${make}`}
      </Text>

      <Text style={styles.summaryText}>
        {isRTL
          ? `${model} :${t('vehicle_summary.model')}`
          : `${t('vehicle_summary.model')}: ${model}`}
      </Text>

      <Text style={styles.summaryText}>
        {isRTL
          ? `${trim} :${t('vehicle_summary.trim')}`
          : `${t('vehicle_summary.trim')}: ${trim}`}
      </Text>

      <VehicleButton label={t('vehicle_summary.add_vehicle')} onPress={handleAddVehicle} />
    </View>
  );
};

export default VehicleSummaryScreen;

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
    textAlign: 'right', // Always align text to the right side
  },
});
