import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import Footer from '../components/Footer';

const SupportScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@electracar.com'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Support</Text>
      <Text style={styles.subHeader}>We're here to help!</Text>
      <Text style={styles.paragraph}>
        If you're experiencing any issues or have questions, feel free to reach out to us.
      </Text>

      <Text style={styles.paragraph}>
        You can contact our support team by sending an email to:
      </Text>

      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.emailLink}>support@electracar.com</Text>
      </TouchableOpacity>

      <Text style={styles.paragraph}>
        We aim to respond within 24-48 hours. Thank you for using ElectraCar!
      </Text>
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    color: 'black',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginTop: 8,
    lineHeight: 22,
    color: '#333',
    textAlign: 'center',
  },
  emailLink: {
    fontSize: 16,
    color: '#0000EE',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SupportScreen;
