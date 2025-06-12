import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import VehicleButton from '../components/VehicleButton';
import { useTranslation } from 'react-i18next';
import { VehicleContext } from '../context/VehicleContext';

const ManageVehiclesScreen = () => {
  const { vehicles, deleteVehicle } = useContext(VehicleContext);
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const handleDelete = (id) => {
    Alert.alert(
      t('manage_vehicles.confirm_title'),
      t('manage_vehicles.confirm_message'),
      [
        { text: t('manage_vehicles.cancel'), style: 'cancel' },
        {
          text: t('manage_vehicles.delete'),
          style: 'destructive',
          onPress: () => deleteVehicle(id),
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, isRTL && { flexDirection: 'row-reverse' }]}>
      <Text
        style={styles.text}
      >
        {item.make} {item.model} ({item.trim})
      </Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Text style={styles.icon}>–</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonWrapper}>
        <VehicleButton
          label={t('manage_vehicles.done')}
          onPress={() => navigation.navigate('VehiclePickScreen')}
          isRTL={isRTL}
        />
      </View>
    </SafeAreaView>
  );
};

export default ManageVehiclesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContainer: { padding: 20, paddingBottom: 100 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  text: 
  { 
    fontSize: 16, 
    color: 'black' 
  },
  arabicText: 
  { 
    fontFamily: 'IBM-Regular' 
  },
  icon: 
  { 
    fontSize: 28, 
    color: '#666', 
    fontWeight: 'bold' 
  },
  buttonWrapper: 
  { 
    paddingHorizontal: 20, 
    paddingBottom: 20, 
    backgroundColor: '#fff' 
  },
});
