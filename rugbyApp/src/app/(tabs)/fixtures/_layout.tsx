import { colors, fontFamilies } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { Button, View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native"
import {FontAwesome6} from '@expo/vector-icons'
import { useFonts } from "expo-font"


const FavouritesScreenLayout = () => {

    return <View style={defaultStyles.container}>
        <Stack screenOptions={{
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
                headerTitle: 'Fixtures'
                }} />
        </Stack>		
    </View>
}


export default FavouritesScreenLayout