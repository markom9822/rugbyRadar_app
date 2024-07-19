import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View } from "react-native"

const PlaylistsScreenLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle: 'Rankings'
                }} />
        </Stack>
    </View>
}

export default PlaylistsScreenLayout