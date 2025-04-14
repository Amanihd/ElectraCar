// components/TermsLinks.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsLinks = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>By continuing you agree to our </Text>
      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
          <Text style={styles.link}>Terms of Use</Text>
        </TouchableOpacity>
        <Text style={styles.text}> and </Text>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 40,
    
  },
  text: {
    fontSize: 14,
    color: '#444'
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 14,
    color: '#000C66',
    textDecorationLine: 'underline'
  }
});

export default TermsLinks;
