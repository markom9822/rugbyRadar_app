import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { GridView } from '@/store/components/GridView';
import { RugbyLeagues } from '@/store/RugbyLeaguesDatabase';
import { GridSearchPanel } from './(tabs)/search';
import { setItem } from '@/store/utils/asyncStorage';
import { useRouter } from 'expo-router';

export default function ModalScreen() {

  const leaguesArray = RugbyLeagues;
  const router = useRouter();

  const setDefaultLeague = async (leagueValue: string) => {
      await setItem('defaultLeague', leagueValue);
  }

  const handleChooseLeague = async (id: string, index: number) => {
    console.log(`chose league: ${leaguesArray[index].value}`)
    await setDefaultLeague(leaguesArray[index].value)

    router.navigate("/")
  }

  return (
    <ThemedView style={styles.container}>

      <GridView
        data={leaguesArray}
        col={2}
        renderItem={(item, index) =>
        <GridSearchPanel
          title={item.abbreviation}
          colour={item.colour}
          logo={item.logo}
          altLogo={item.altLogo}
          id={item.id}
          index={index}
          OnPress={handleChooseLeague} />
                          } />
      
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