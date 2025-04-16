import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '../components/Logo';
import Footer from '../components/Footer';
import TermsLinks from '../components/TermsLinks';
import CustomInput from '../components/CustomInput';
import JoinButton from '../components/JoinButton';
import useUserStore from '../store/userStore.js';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useUserStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[a-zA-Z]+$/.test(firstName.trim())) {
      newErrors.firstName = 'Only letters allowed';
    } else if (firstName.length < 2 || firstName.length > 30) {
      newErrors.firstName = 'Must be 2-30 characters';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[a-zA-Z]+$/.test(lastName.trim())) {
      newErrors.lastName = 'Only letters allowed';
    } else if (lastName.length < 2 || lastName.length > 10) {
      newErrors.lastName = 'Must be 2-10 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'At least 8 characters';
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
      newErrors.password = 'Use letters & numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleJoin = () => {
    if (validate()) {
      // mock the user until backend is ready
      const mockUser = {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
      };
      setUser(mockUser);
      navigation.navigate('MainTabs', { screen: 'Me' });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>Create your account</Text>

        <CustomInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          error={errors.firstName}
          autoCapitalize="words"
          maxLength={30}
        />
        <CustomInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          error={errors.lastName}
          autoCapitalize="words"
          maxLength={30}
        />
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
        />

        <JoinButton onPress={handleJoin} />
        <TermsLinks />
      </View>

      <Footer />
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

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
    marginBottom: 24,
    textAlign: 'center',
    color: 'black',
  },
});
