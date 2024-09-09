import { colors } from '@/constants/tokens'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
	return <SafeAreaProvider>
		<RootNavigation />

		<StatusBar style='auto'/>
	</SafeAreaProvider>

}

const RootNavigation = () => {
	return(
		<Stack>
			<Stack.Screen  name='(tabs)' options={{headerShown: false, statusBarColor: colors.background,
				 navigationBarColor: colors.background}}/>
		</Stack>
	)
}

export default App