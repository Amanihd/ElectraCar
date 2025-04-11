import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';

const mockUserVehicles = [
  { id: 1, make: 'Tesla', model: 'Model 3', trim: 'Standard' },
  { id: 2, make: 'Kia', model: 'EV6', trim: 'GT-Line' }
];


  const VehiclePickScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigation = useNavigation();

  const handleSelect = () => {
    // Save selected vehicle logic here (local or backend)
     navigation.navigate('MainTabs', { screen: 'Me' })
     };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedId(item.id)} style={styles.item}>
      <Text style={styles.vehicleText}>
        {item.make} {item.model} ({item.trim})
      </Text>
      <Text style={styles.radio}>{selectedId === item.id ? '●' : '○'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockUserVehicles}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity>
        <Text onPress={() => navigation.navigate('ManageVehiclesScreen')} style={styles.link}>MANAGE VEHICLES</Text>
      </TouchableOpacity>
       
      <VehicleButton label="ADD VEHICLE" onPress={handleSelect} />
     

    </View>
  );
};

export default VehiclePickScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  vehicleText: { fontSize: 16, color: 'black' },
  radio: { fontSize: 20 },
  link: {
    color: '#0033A0',
    marginTop: 19,
    fontSize: 20,
    textAlign:'center'
  },
});
