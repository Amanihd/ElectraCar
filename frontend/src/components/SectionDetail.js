// SectionDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectionDetail = ({ title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHeader}>{title}</Text>
      <Text>{content || "Not available"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingLeft: 25, // Shift content to the right
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 7,
   
  },
});

export default SectionDetail;
