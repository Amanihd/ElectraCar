// components/CustomInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ value, onChangeText, placeholder, error, ...rest }) => (
  <View style={styles.container}>
    <TextInput
      placeholder={placeholder}
      style={[styles.input, error && styles.errorInput]}
      value={value}
      onChangeText={onChangeText}
      {...rest}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
