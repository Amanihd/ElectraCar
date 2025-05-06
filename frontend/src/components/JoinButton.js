import React from 'react';
import { TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next'; 

const JoinButton = ({ onPress, title }) => {
  const { t } = useTranslation(); 

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, I18nManager.isRTL && styles.rtlText]}>
        {title ? title : t('join_Button')}
      </Text>
    </TouchableOpacity>
  );
};

export default JoinButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000C66',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'center',
  },
});
