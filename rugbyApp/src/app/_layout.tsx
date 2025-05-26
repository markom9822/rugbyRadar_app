import { colors } from '@/constants/tokens';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {

	const [loaded, error] = useFonts({
		'WorkSans-Light': require('@/assets/fonts/WorkSans-Light.ttf'),
		'WorkSans-Regular': require('@/assets/fonts/WorkSans-Regular.ttf'),
		'WorkSans-SemiBold': require('@/assets/fonts/WorkSans-SemiBold.ttf'),
		'Avega-Italic': require('@/assets/fonts/avega.italic.ttf'),
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

		<StatusBar style='light' />
	</SafeAreaProvider>

}

const RootNavigation = () => {

	SystemUI.setBackgroundColorAsync(colors.background);

	return (
		<Stack>
			<Stack.Screen name='(tabs)' options={{
				headerShown: false, statusBarColor: colors.background,
				navigationBarColor: 'black'
			}} />
		</Stack>
	)
}

export default App