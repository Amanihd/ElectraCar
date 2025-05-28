
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignOutButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.signOutButton}>
    <Text style={styles.signOutText}>Sign Out</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  signOutButton: {
    backgroundColor: "#ddd", 
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center', 
  },
  signOutText: {
    color: 'black',
    fontSize: 16,
  },
});

export default SignOutButton;
