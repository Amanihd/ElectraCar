import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import vehicles from '../data/vehicles.json';

const TrimScreen = () => {
  const navigation = useNavigation();
 const { make, model, fromVehicleModal } = useRoute().params;

  const trims = vehicles
    .filter(v => v.make === make && v.model === model)
    .map(v => v.trim);

  const handleTrimPress = (trim) => {
    navigation.navigate('Vehicle Summary', { 
      make, 
      model, 
      trim,
      fromVehicleModal, 
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={trims}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTrimPress(item)} style={styles.item}>
            <Text style={styles.text}>{item}</Text>
            <View style={styles.divider} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TrimScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 16,
  },
  text: {
    fontSize: 18,
    color: 'Black',
    paddingBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});