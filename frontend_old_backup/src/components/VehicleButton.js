
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const VehicleButton = ({ label, onPress, fullWidth = true, isRTL = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, fullWidth && styles.fullWidth]} 
      onPress={onPress}
    >
      <Text style={[styles.text, isRTL && styles.arabicText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default VehicleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000C66',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: '10%',
    alignItems: 'center',
    marginVertical: 40,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  fullWidth: {
    alignSelf: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  arabicText: {
    fontFamily: 'IBM-SemiBold',
    fontWeight: undefined, 
  }
});
