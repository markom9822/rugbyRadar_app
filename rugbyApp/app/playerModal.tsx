import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function PlayerModalScreen() {

  const router = useRouter();

  const handleChooseLeague = async (id: string, index: number) => {

    router.navigate("/")
  }

  return (
    <ThemedView style={styles.container}>

    
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4
  }
});