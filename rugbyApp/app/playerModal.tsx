import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { GridView } from '@/store/components/GridView';
import { RugbyLeagues } from '@/store/RugbyLeaguesDatabase';
import { GridSearchPanel } from './(tabs)/search';
import { useRouter } from 'expo-router';

export default function PlayerModalScreen() {

  const leaguesArray = RugbyLeagues;
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