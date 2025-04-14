import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const UserProfileCard = ({ name, email }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.profileBox}>

      <View style={styles.headerRow}>
        <Ionicons name="person-circle-outline" size={50} color="#666" />

        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
          <Ionicons name="create-outline" size={24} color="#000C66" />
        </TouchableOpacity>
      </View>

    
      <View style={styles.buttonWrapper}>
        <Button
          title="Add Vehicle"
          color="#000C66"
          onPress={() => navigation.navigate('AddVehicle')}
        />
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  profileBox: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginBottom: 20,
    borderColor:'gray',
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  buttonWrapper: {
    marginTop: 20,
  },
});
