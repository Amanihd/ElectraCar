import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MyProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  
  // Initial data from navigation params or default values
  const [profile, setProfile] = useState(route.params?.profile || {
    name: 'John Doe',
    email: 'john.doe@example.com',
  });
  
  const [tempProfile, setTempProfile] = useState({...profile});

  const handleSave = () => {
    setProfile(tempProfile);
    setIsEditing(false);
    // Here you would typically call an API to update the profile
  };

  return (
    <View style={styles.container}>
      

      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Ionicons name="person-circle-outline" size={120} color="#666" />
       
      </View>

      {/* Profile Info */}
      <View style={styles.profileBox}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({...tempProfile, name: text})}
              autoCapitalize="words"
            />
          ) : (
            <Text style={styles.value}>{profile.name}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={tempProfile.email}
              onChangeText={(text) => setTempProfile({...tempProfile, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.value}>{profile.email}</Text>
          )}
        </View>

        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000C66',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  editPhotoButton: {
    marginTop: 10,
  },
  editPhotoText: {
    color: '#000C66',
    fontSize: 16,
  },
  profileBox: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    borderColor: 'gray',
    borderWidth: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#000C66',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addVehicleButton: {
    backgroundColor: '#000C66',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addVehicleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyProfileScreen;