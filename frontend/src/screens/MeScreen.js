import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import UserProfileCard from '../components/UserProfileCard';
import MeLinksContainer from '../components/MeLinksContainer'; // Update import
import { useNavigation } from '@react-navigation/native';

const MeScreen = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  // Mocking loading user (in a real scenario, you'd use useUserStore)
  useEffect(() => {
    // const mockUser = { name: "John Doe", email: "johndoe@example.com" };
    // setUser(mockUser);
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.jpg')} // Path to your app logo image
          style={styles.logo}
        />
        <Text style={styles.subtitle}>Join the ElectraCar community</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate('Join')}>
          <Text style={styles.linkText}>Sign up or sign in today</Text>
        </TouchableOpacity>

       
        <MeLinksContainer navigation={navigation} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UserProfileCard name={user.name} email={user.email} />
    
      
      <MeLinksContainer navigation={navigation} />

      <View style={{ marginTop: 30 }}>
        <Button title="Sign Out" color="red" onPress={() => setUser(null)} />
      </View>
    </View>
  );
};

export default MeScreen;

const styles = StyleSheet.create({
  
});
