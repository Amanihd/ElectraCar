import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import vehicles from '../data/vehicles.json';
import { useNavigation } from '@react-navigation/native';

const MakeScreen = () => {
  const navigation = useNavigation();
  const [makes, setMakes] = useState([]);

  useEffect(() => {
    const uniqueMakes = [...new Set(vehicles.map(v => v.make))];
    setMakes(uniqueMakes);
  }, []);

  const handleMakePress = (make) => {
    navigation.navigate('Model', { make });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMakePress(item)} style={styles.itemContainer}>
      <Text style={styles.makeText}>{item}</Text>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={makes}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </View>
  );
};

export default MakeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  itemContainer: {
    paddingVertical: 16,
  },
  makeText: {
    fontSize: 18,
    color: 'black',

    paddingBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
  },
});
