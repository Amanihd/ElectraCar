{/*import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';

const initialVehicles = [
  { id: 1, make: 'Tesla', model: 'Model 3', trim: 'Standard' },
  { id: 2, make: 'Kia', model: 'EV6', trim: 'GT-Line' }
];

const ManageVehiclesScreen = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
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
            <TouchableOpacity
              onPress={() => {
                setSelectedToDelete(item.id);
                handleDelete(item.id);
              }}
            >
              <Text style={[
                styles.icon,
                selectedToDelete === item.id && styles.iconActive
              ]}>
                –
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <VehicleButton
        label="Done"
        onPress={() => navigation.navigate('VehiclePickScreen')}
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
  text: { fontSize: 16, color: 'black' },
  icon: {
    fontSize: 28,
    color: '#666',
    fontWeight: 'bold'
  },
  iconActive: {
    color: 'red'
  }
});*/}
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';
import { useTranslation } from 'react-i18next';

const initialVehicles = [
  { id: 1, make: 'Tesla', model: 'Model 3', trim: 'Standard' },
  { id: 2, make: 'Kia', model: 'EV6', trim: 'GT-Line' },
];

const ManageVehiclesScreen = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const navigation = useNavigation();

  const handleDelete = (id) => {
    Alert.alert(
      t('manage_vehicles.confirm_title'),
      t('manage_vehicles.confirm_message'),
      [
        { text: t('manage_vehicles.cancel'), style: 'cancel' },
        {
          text: t('manage_vehicles.delete'),
          style: 'destructive',
          onPress: () => setVehicles(vehicles.filter((v) => v.id !== id)),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, I18nManager.isRTL && { flexDirection: 'row-reverse' }]}>
      <Text style={[styles.text, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}>
        {item.make} {item.model} ({item.trim})
      </Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedToDelete(item.id);
          handleDelete(item.id);
        }}
      >
        <Text
          style={[
            styles.icon,
            selectedToDelete === item.id && styles.iconActive,
          ]}
        >
          –
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <VehicleButton
        label={t('manage_vehicles.done')}
        onPress={() => navigation.navigate('VehiclePickScreen')}
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
    borderBottomColor: '#ccc',
  },
  text: { fontSize: 16, color: 'black' },
  icon: {
    fontSize: 28,
    color: '#666',
    fontWeight: 'bold',
  },
  iconActive: {
    color: 'red',
  },
});

