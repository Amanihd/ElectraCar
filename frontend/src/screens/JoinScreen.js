import React, { useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import Logo from '../components/Logo';
import Footer from '../components/Footer';
import TermsLinks from '../components/TermsLinks';
import { AuthContext } from '../context/AuthContext';

const JoinScreen = () => {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.dir() === 'rtl';
  //arabic style( IBM font)
  const arabicTextStyle = isRTL ? styles.arabicText : {};

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('MainTabs');
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [navigation])
  );

  return (
    
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.content}>
        <Logo />

        
        <Text style={[styles.title, isRTL && styles.arabicTitle]}>
          {t('join.title')}
        </Text>

        
        <TouchableOpacity
          style={styles.emailButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={[styles.buttonText, arabicTextStyle]}>
            {t('join.signup_email')}
          </Text>
        </TouchableOpacity>

       
        <View style={[styles.linksContainer, isRTL && { flexDirection: 'row-reverse' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.text, arabicTextStyle]}>
              {t('join.already_member')}{' '}
              <Text style={[styles.linkText, arabicTextStyle]}>
                {t('join.signin')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TermsLinks />
      </View>

      <Footer />
      </ScrollView>
      </View>
    
  );
};

export default JoinScreen;

const styles = StyleSheet.create({
  
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  content: {
    flex: 2,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 40,
    color: 'black',
    textAlign: 'center',
  },
  arabicTitle: {
    fontFamily: 'IBM-SemiBold',
    fontWeight: undefined, 
  },
  emailButton: {
    backgroundColor: '#000C66',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'normal',
    fontWeight: 'bold',
  },
  arabicText: {
    fontFamily: 'IBM-SemiBold',
    fontWeight: undefined, 
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: '#666',
    fontSize: 14,
    fontWeight: 'normal',
  },
  linkText: {
    color: '#000C66',
    fontWeight: 'bold',
    fontSize: 14,

  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 20,
  },
});