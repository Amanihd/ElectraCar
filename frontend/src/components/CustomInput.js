
{/*import React from 'react';
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
});*/}
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

// Optional: Check Arabic characters
const isArabicText = (text) => /[\u0600-\u06FF]/.test(text);

const CustomInput = ({ value, onChangeText, placeholder, error, ...rest }) => {
  const { i18n } = useTranslation();
  const isArabicLang = i18n.language === 'ar';
  const isArabic = isArabicText(placeholder);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.input,
          error && styles.errorInput,
          {
            textAlign: isArabic ? 'right' : 'left',
            writingDirection: isArabic ? 'rtl' : 'ltr',
          },
        ]}
        {...rest}
      />
      {error && (
        <Text
          style={[
            styles.errorText,
            {
              textAlign: isArabicLang ? 'right' : 'left',
              alignSelf: isArabicLang ? 'flex-end' : 'flex-start',
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
    marginHorizontal: 4,
  },
});




