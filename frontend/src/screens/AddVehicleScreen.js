import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';




const AddVehicleScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Back button could be added here */}

      <Text style={styles.title}>Personalize your experience by adding a vehicle</Text>
      <Image
        source={require('../../assets/images/car-animation.png')} // Replace with real animation or photo
        style={styles.image}
        resizeMode='cover'
      />
      
      <Text style={styles.subtitle}>
        Your vehicle is used to determine compatible charging stations
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Make')}>
        <Text style={styles.buttonText}>ADD VEHICLE</Text>
        </TouchableOpacity>

      <TouchableOpacity  onPress={() => navigation.navigate('MainTabs', { screen: 'Me' })}>
        <Text style={styles.link}>ADD LATER</Text>
      </TouchableOpacity>

    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    justifyContent: 'center',
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#555'
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20
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
  link: {
    color: '#0033A0',
    marginTop: 12,
    fontSize: 14
  }
});

export default AddVehicleScreen;



