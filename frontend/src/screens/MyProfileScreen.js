import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, I18nManager } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const MyProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...user });

  const handleSave = () => {
    updateUser(tempProfile);
    setIsEditing(false);
  };

  const isRTL = i18n.dir() === 'rtl';

  if (!user) return <Text>{t('loading')}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Ionicons name="person-circle-outline" size={120} color="#000C66" />
       
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t('my_profile_screen.my_info')}</Text>

        {/* Name */}
        <View style={[styles.row, isRTL && { flexDirection: 'row-reverse' }]}>
          <Feather name="user" size={20} color="#000C66" />
          {isEditing ? (
            <TextInput
              style={[styles.input, isRTL && { textAlign: 'right' }]}
              value={tempProfile.name}
              onChangeText={(text) => setTempProfile({ ...tempProfile, name: text })}
              placeholder={t("my_profile_screen.name")}
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text style={[styles.infoText, isRTL && { textAlign: 'right' }]}>{user.name}</Text>
          )}
        </View>

 {/* Email field: text always LTR, icon right only in Arabic */}
<View style={styles.row}>
  {isRTL ? (
    // Arabic: Text first, icon last
    <>
      {isEditing ? (
        <TextInput
          style={[styles.input, { textAlign: 'left', writingDirection: 'ltr' }]}
          value={tempProfile.email}
          onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
          placeholder={t("my_profile_screen.email")}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      ) : (
        <Text style={[styles.infoText, { textAlign: 'left', writingDirection: 'ltr' }]}>
          {user.email}
        </Text>
      )}
      <Feather name="mail" size={20} color="#000C66" style={{ marginLeft: 10 }} />
    </>
  ) : (
    // English: Icon first, then text
    <>
      <Feather name="mail" size={20} color="#000C66" style={{ marginRight: 10 }} />
      {isEditing ? (
        <TextInput
          style={[styles.input, { textAlign: 'left', writingDirection: 'ltr' }]}
          value={tempProfile.email}
          onChangeText={(text) => setTempProfile({ ...tempProfile, email: text })}
          placeholder={t("my_profile_screen.email")}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      ) : (
        <Text style={[styles.infoText, { textAlign: 'left', writingDirection: 'ltr' }]}>
          {user.email}
        </Text>
      )}
    </>
  )}
</View>



        {/* Button */}
        <TouchableOpacity
          style={isEditing ? styles.saveButton : styles.editButton}
          onPress={isEditing ? handleSave : () => setIsEditing(true)}
        >
          <Text style={isEditing ? styles.saveButtonText : styles.editButtonText}>
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
