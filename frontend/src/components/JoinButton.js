import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const JoinButton = ({ onPress, title = "Join" }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default JoinButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 12,
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
