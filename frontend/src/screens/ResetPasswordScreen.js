{/*import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const PasswordReset = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!newPassword.trim()) {
      setError('Password is required');
      return false;
    } else if (newPassword.length < 8) {
      setError('At least 8 characters');
      return false;
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
      setError('Use letters & numbers');
      return false;
    } else if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleReset = () => {
    if (validate()) {
      //  Send password and email to backend

      // for now 
      alert('Password successfully updated!');
      navigation.navigate('SignIn');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Resetting password for: {email}</Text>

        <CustomInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          error={error}
        />

        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default PasswordReset;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
*/}
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const PasswordReset = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';
  const { t } = useTranslation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!newPassword.trim()) {
      setError(t('password_required'));
      return false;
    } else if (newPassword.length < 8) {
      setError(t('password_min_length'));
      return false;
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(newPassword)) {
      setError(t('password_letters_numbers'));
      return false;
    } else if (newPassword !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return false;
    }
    setError('');
    return true;
  };

  const handleReset = () => {
    if (validate()) {
      //  here will be backend 

      Alert.alert(
        t('password_updated'),
        t('password_updated_description'),
        [
          {
            text: t('ok_button'),
            onPress: () => navigation.navigate('SignIn'),
          },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>{t('reset_password')}</Text>
        <Text style={styles.subtitle}>
          {t('resetting_password_for')}: {email}
        </Text>

        <CustomInput
          placeholder={t('new_password')}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
          error={error}
        />

        <CustomInput
          placeholder={t('confirm_password')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>{t('update_password')}</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default PasswordReset;
const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  inner: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


