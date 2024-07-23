import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const StandingsScreenLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle: 'Standings'
                }} />
        </Stack>
    </View>
}

export default StandingsScreenLayout