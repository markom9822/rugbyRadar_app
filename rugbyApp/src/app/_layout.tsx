import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SystemUI from 'expo-system-ui';

const App = () => {
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