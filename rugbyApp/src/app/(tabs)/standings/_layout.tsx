import { colors, fontFamilies } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const StandingsScreenLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: colors.background
            },
            headerTitleStyle: {
                color: colors.text,
                fontFamily: fontFamilies.bold
            },
            headerTintColor: colors.text
        }}>
            <Stack.Screen name="index" options={{
                headerTitle: 'Standings'
            }} />
        </Stack>
    </View>
}

export default StandingsScreenLayout