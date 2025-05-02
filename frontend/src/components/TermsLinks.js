{/*
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

export default TermsLinks;*/}

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const TermsLinks = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const isRTL = I18nManager.isRTL;

  return (
    <View style={[styles.container, isRTL && { alignItems: 'flex-end' }]}>
      <Text style={styles.text}>{t('terms.agree_prefix')}</Text>
      <View style={[styles.linkRow, isRTL && { flexDirection: 'row-reverse' }]}>
        <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
          <Text style={styles.link}>{t('termsOfUse')}</Text>
        </TouchableOpacity>
        <Text style={styles.text}> {t('terms.and')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.link}>{t('privacyPolicy')}</Text>
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
    color: '#444',
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    fontSize: 14,
    color: '#000C66',
    textDecorationLine: 'underline',
  },
});

export default TermsLinks;

