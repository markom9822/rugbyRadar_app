import { colors, fontFamilies } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { Stack } from "expo-router"
import { View, } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const FavouritesScreenLayout = () => {

    return <GestureHandlerRootView>

        <BottomSheetModalProvider>

            <View style={defaultStyles.container}>
                <Stack screenOptions={{
                    headerShown: false,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTitleStyle: {
                        color: colors.text,
                        fontFamily: fontFamilies.title,
                    },
                    headerTintColor: colors.text
                }}>
                    <Stack.Screen name="index" options={{
                        headerTitle: 'Rugby Radar'
                    }} />
                </Stack>
            </View>

        </BottomSheetModalProvider>

    </GestureHandlerRootView>
}

export default FavouritesScreenLayout