import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const TermsLinks = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const arabicTextStyle = isRTL ? styles.arabicText : {};
  const arabicLinkStyle = isRTL ? styles.arabicLink : {};

  return (
    <View style={styles.container}>
      <Text style={[styles.text, arabicTextStyle, styles.centerText]}>
        {t('terms.agree_prefix')}
      </Text>
      <View style={[styles.linkRow, isRTL && styles.rtlLinkRow]}>
        <TouchableOpacity onPress={() => navigation.navigate('TermsOfUse')}>
          <Text style={[styles.link, arabicLinkStyle, styles.centerText]}>
            {t('termsOfUse')}
          </Text>
        </TouchableOpacity>
        <Text style={[styles.text, arabicTextStyle, styles.centerText]}>
          {' ' + t('terms.and') + ' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={[styles.link, arabicLinkStyle, styles.centerText]}>
            {t('privacyPolicy')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  text: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  arabicText: {
    fontFamily: 'IBM-Regular',
    fontWeight: undefined,
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtlLinkRow: {
    flexDirection: 'row-reverse',
  },
  link: {
    fontSize: 14,
    color: '#000C66',
    textDecorationLine: 'underline',
    fontWeight: 'normal',
    textAlign: 'center',
  },
  arabicLink: {
    fontFamily: 'IBM-SemiBold',
    fontWeight: undefined,
  },
  centerText: {
    textAlign: 'center',
    alignSelf: 'center',
  },
});

export default TermsLinks;