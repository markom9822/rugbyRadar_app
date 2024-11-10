import { Pressable, Text, StyleSheet } from "react-native"
import {MaterialCommunityIcons, FontAwesome6} from '@expo/vector-icons'


export const CustomTabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label} : {onPress: Function, onLongPress: Function, isFocused: boolean, routeName: string, color: string, label: string}) => {


    const iconRender = (tabName: string, isFocused: boolean) => {

        if(tabName === "fixtures")
        {
            return (
                <MaterialCommunityIcons name="rugby" size={24} color={isFocused ? "white": "grey"} />
            )

        }
        else if (tabName === "(teams)")
        {
            return (
                <FontAwesome6 name="shield-halved" size={22} color={isFocused ? "white": "grey"}/>
            )
        }
        else if (tabName === "standings")
        {
            return (
                <FontAwesome6 name="ranking-star" size={20} color={isFocused ? "white": "grey"} />
            )
        }
    
        
        return null
    }


    return (
        <Pressable
        onPress={() => onPress()}
        onLongPress={() => onLongPress()}
        style={styles.tabbarButton}>

            {iconRender(routeName, isFocused)}
            <Text style={{color: isFocused ? "white": "grey", textAlign: 'center'}}>
                {label}
            </Text>
            
        </Pressable>
    )

}

const styles = StyleSheet.create({
    tabbarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})

export default CustomTabBarButton;