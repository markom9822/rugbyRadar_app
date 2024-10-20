import { colors, fontFamilies } from '@/constants/tokens'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui';
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen';

const App = () => {

	const [loaded, error] = useFonts({
		'WorkSans-Light': require('@/assets/fonts/WorkSans-Light.ttf'),
		'WorkSans-Regular': require('@/assets/fonts/WorkSans-Regular.ttf'),
		'WorkSans-SemiBold': require('@/assets/fonts/WorkSans-SemiBold.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
		  SplashScreen.hideAsync();
		}
	  }, [loaded, error]);
	
	if (!loaded && !error) {
		return null;
	}

	return <SafeAreaProvider>
		<RootNavigation />

		<StatusBar style='light'/>
	</SafeAreaProvider>

}

const RootNavigation = () => {

	SystemUI.setBackgroundColorAsync(colors.background);

	return(
		<Stack>
			<Stack.Screen  name='(tabs)' options={{headerShown: false, statusBarColor: colors.background,
				 navigationBarColor: 'black'}}/>
		</Stack>
	)
}

export default App