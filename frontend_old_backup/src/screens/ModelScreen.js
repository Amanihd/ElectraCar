import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import vehicles from '../data/vehicles.json';

const ModelScreen = () => {
  const navigation = useNavigation();
   const { make, fromVehicleModal } = useRoute().params;

  const models = [
    ...new Set(vehicles.filter(v => v.make === make).map(v => v.model))
  ];

 const handleModelPress = (model) => {
    navigation.navigate('Trim', {
      make,
      model,
      fromVehicleModal, 
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={models}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleModelPress(item)} style={styles.item}>
            <Text style={styles.text}>{item}</Text>
            <View style={styles.divider} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ModelScreen;

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
    color: 'black',
    paddingBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});