import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const MeLink = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MeLink;

const styles = StyleSheet.create({
  link: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color: '#007bff',
  },
});
