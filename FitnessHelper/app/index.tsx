import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../components/Button';
import Colors from '../constants/Colors';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/dumbbell.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Button title="Let's Start" onPress={() => router.push('/Dashboard')} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});
