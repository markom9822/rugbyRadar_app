import { colors } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { Button, View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native"
import {FontAwesome6} from '@expo/vector-icons'


const FavouritesScreenLayout = () => {
    return <View style={defaultStyles.container}>
        <Stack>
            <Stack.Screen name="index" options={{
                headerTitle: 'Fixtures'
                }} />
        </Stack>		
    </View>
}


export default FavouritesScreenLayout