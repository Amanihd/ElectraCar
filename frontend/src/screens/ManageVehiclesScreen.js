import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const initialVehicles = [
  { id: 1, make: 'Tesla', model: 'Model 3', trim: 'Standard' },
  { id: 2, make: 'Kia', model: 'EV6', trim: 'GT-Line' }
];

const ManageVehiclesScreen = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const navigation = useNavigation();

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this vehicle?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setVehicles(vehicles.filter(v => v.id !== id))
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.make} {item.model} ({item.trim})</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.delete}>🗑</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default ManageVehiclesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  text: { fontSize: 16, color: '#000C66' },
  delete: { fontSize: 20, color: 'red' }
});
