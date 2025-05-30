import { View, Text, StyleSheet } from 'react-native';
import BottomNavBar from '../components/Navbar';
import Colors from '../constants/Colors';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Dashboard!</Text>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 20,
    color: Colors.primary,
  },
});
