// Footer.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>© 2025 ElectraCar. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 'auto', // This ensures the footer stays at the bottom of the screen
  },
  footerText: {
    color: '#888', // Gray color for the copyright text
    fontSize: 14,
  },
});

export default Footer;
