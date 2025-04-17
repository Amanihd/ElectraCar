
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';
import LottieView from "lottie-react-native";


const VehicleSummaryScreen = () => {
  const { make, model, trim } = useRoute().params;
  const navigation = useNavigation();

  const handleAddVehicle = () => {
    // You’ll send data to the backend here later
    //if the first attempt then navigate me screen
    //if second attempt then navigate to PickSCreen
    // For now: navigate to MeScreen or VehiclePickerScreen
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
      {/*<Text style={styles.title}>Vehicle Summary</Text>*/}
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
  
});


