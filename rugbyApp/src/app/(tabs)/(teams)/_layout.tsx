import { colors } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const TeamsSearchLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack screenOptions={{
            headerStyle: {
            backgroundColor: colors.background
            },
            headerTitleStyle: {
                color: colors.text
            },
            headerTintColor: colors.text,
        }}>
            <Stack.Screen name="index" options={{
                headerTitle: 'Teams'
                }} />
        </Stack>
    </View>
}

export default TeamsSearchLayout