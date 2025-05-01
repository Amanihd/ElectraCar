import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = 'Please enter a valid email';

    if (!password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (validate()) {
      // Mock login for now
      login({ name: 'John Doe', email });
      navigation.navigate('MainTabs', { screen: 'Me' });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.outerContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <Logo />
        <Text style={styles.title}>Sign in</Text>

        <CustomInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry={!showPassword}
          showPasswordToggle={true}
          isPasswordVisible={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.text}>Not a member? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outerContainer:
   { 
    flex: 1, 
    justifyContent: 'space-between', 
    backgroundColor: '#f2f2f2' 
  },
  inner:
   { flex: 1, 
    padding: 20, 
    justifyContent: 'center' 

   },
  title: 
  { fontSize: 22, 
    fontWeight: 'bold',
     marginBottom: 24, 
     textAlign: 'center', 
     color: 'black' 
  },
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: 
  { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 

  },
  linksContainer: 
  { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 20, marginBottom: 10 
  },
  text: { color: '#666' },
  linkText: 
  { 
    color: '#000C66', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
});

export default SignInScreen;
