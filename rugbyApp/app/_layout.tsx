import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { defaultStyles } from '@/styles';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

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


  return (
    <SafeAreaView style={defaultStyles.container}>
      <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetModalProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
