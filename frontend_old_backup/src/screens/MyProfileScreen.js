import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const MyProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...user });

  const isRTL = i18n.dir() === 'rtl';
  const font = isRTL ? { fontFamily: 'IBM-SemiBold' } : {};

  
  useEffect(() => {
    if (!user) {
      navigation.replace('Join'); 
    }
  }, [user, navigation]);

  const handleSave = () => {
    updateUser(tempProfile);
    setIsEditing(false);
  };

  if (!user) return null; 

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={120} color="#000C66" />
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, font]}>{t('my_profile_screen.my_info')}</Text>

        {/* Name */}
        <View style={[styles.row, isRTL && { flexDirection: 'row-reverse' }]}>
          <Feather name="user" size={20} color="#000C66" />
          {isEditing ? (
            <TextInput
              style={[styles.input, font, isRTL && { textAlign: 'right' }]}
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
              placeholder={t("my_profile_screen.name")}
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text style={[styles.infoText, font, isRTL && { textAlign: 'right' }]}>
              {user.name}
            </Text>
          )}
        </View>

        {/* Email */}
        <View style={styles.row}>
          {isRTL ? (
            <>
              {isEditing ? (
                <TextInput
                  style={[styles.input, font, { textAlign: 'left', writingDirection: 'ltr' }]}
                  value={tempProfile.email}
                  onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
                  placeholder={t("my_profile_screen.email")}
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={[styles.infoText, font, { textAlign: 'left', writingDirection: 'ltr' }]}>
                  {user.email}
                </Text>
              )}
              <Feather name="mail" size={20} color="#000C66" style={{ marginLeft: 10 }} />
            </>
          ) : (
            <>
              <Feather name="mail" size={20} color="#000C66" style={{ marginRight: 10 }} />
              {isEditing ? (
                <TextInput
                  style={[styles.input, font, { textAlign: 'left', writingDirection: 'ltr' }]}
                  value={tempProfile.email}
                  onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
                  placeholder={t("my_profile_screen.email")}
                  placeholderTextColor="#aaa"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={[styles.infoText, font, { textAlign: 'left', writingDirection: 'ltr' }]}>
                  {user.email}
                </Text>
              )}
            </>
          )}
        </View>

        <TouchableOpacity
          style={isEditing ? styles.saveButton : styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={[isEditing ? styles.saveButtonText : styles.editButtonText, font]}>
            {isEditing ? t("my_profile_screen.save_changes") : t("my_profile_screen.edit_profile")}
          </Text>
        </TouchableOpacity>
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
    color: '#000C66',
    marginBottom: 16,
    textAlign: 'center',
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

  editButton: {
    backgroundColor: '#000C66',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#fff',
    fontSize: 16,
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
  },
});
