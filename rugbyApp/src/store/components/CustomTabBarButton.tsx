import { Pressable, Text, StyleSheet, ScaleTransform } from "react-native"
import {MaterialCommunityIcons, FontAwesome6} from '@expo/vector-icons'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useEffect } from "react"
import { isDevelopmentBuild } from "expo-dev-client"


export const CustomTabBarButton = ({onPress, onLongPress, isFocused, routeName, color, label} : {onPress: Function, onLongPress: Function, isFocused: boolean, routeName: string, color: string, label: string}) => {


    const scale = useSharedValue(0)

    useEffect(() => {

        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1: 0): isFocused, {duration: 350} )

    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0,1], [1, 1.1])

        return {
            transform: [{
                scale: scaleValue
            }]
        }
    })

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

            <Animated.View style={animatedIconStyle}>
                {iconRender(routeName, isFocused)}
            </Animated.View>
            
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