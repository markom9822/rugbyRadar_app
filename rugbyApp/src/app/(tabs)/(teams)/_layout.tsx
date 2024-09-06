import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const TeamsSearchLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack screenOptions={{
            headerStyle: {
            backgroundColor: 'grey'
            },
            headerTitleStyle: {
                color: 'white'
            },
            headerTintColor: 'white'
        }}>
            <Stack.Screen name="index" options={{
                headerTitle: 'Teams'
                }} />
        </Stack>
    </View>
}

export default TeamsSearchLayout