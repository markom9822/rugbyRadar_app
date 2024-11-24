import { colors, fontFamilies } from "@/constants/tokens"
import { defaultStyles } from "@/styles"
import { Stack } from "expo-router"
import { View, } from "react-native"


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