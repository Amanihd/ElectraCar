import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignOutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.signOutButton}>
    <Text style={styles.signOutText}>Sign Out</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: "#ddd", // Gray background for button
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center', // Center the text inside the button
  },
  signOutText: {
    color: 'black', // Black text color
    fontSize: 16,
  },
});

export default SignOutButton;
