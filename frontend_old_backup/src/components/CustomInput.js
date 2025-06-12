import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';


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
            fontFamily: isArabic ? 'IBM-Regular' : 'System',
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
              fontFamily: isArabicLang ? 'IBM-Regular' : 'System',
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


