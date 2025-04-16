import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const MyProfileScreen = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...user });

  const handleSave = () => {
    updateUser(tempProfile);
    setIsEditing(false);
  };

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      {/* Static Profile  */}
      <TouchableOpacity style={styles.avatarContainer}>
        <Ionicons name="person-circle" size={120} color="#000C66" />
      </TouchableOpacity>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Info</Text>

        {/* Name Field */}
        <View style={styles.row}>
          <MaterialIcons name="person" size={24} color="#000C66" />
          {isEditing ? (
            <TextInput
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
              style={styles.input}
              placeholder="Name"
            />
          ) : (
            <Text style={styles.infoText}>{user.name}</Text>
          )}
        </View>

        {/* Email Field */}
        <View style={styles.row}>
          <MaterialIcons name="email" size={24} color="#000C66" />
          {isEditing ? (
            <TextInput
              value={tempProfile.email}
              onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={styles.infoText}>{user.email}</Text>
          )}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Action Buttons */}
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>💾 Save Changes</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 20 },
  
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000C66',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 5,
  },

  infoText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
    flex: 1,
  },

  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  editButton: {
    backgroundColor: '#000C66',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
