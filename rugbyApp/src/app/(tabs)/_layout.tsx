import { colors, fontSize } from "@/constants/tokens"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"
import {FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6} from '@expo/vector-icons'


const TabsNavigation = () => {

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: 'rgba(255,255,255, 1)',
            tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
            tabBarLabelStyle: {
                fontSize: fontSize.xs,
                fontWeight: '500',
            },
            headerShown: false,
            tabBarStyle: {
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderTopWidth: 0,
                paddingTop: 8,
                backgroundColor: 'grey'
            },
        

        }}>
            <Tabs.Screen 
            name="fixtures" 
            options={{
                title: "Fixtures",
                tabBarIcon: ({color}) => <MaterialCommunityIcons name="rugby" size={24} color={color} />
            }} />
            <Tabs.Screen name="(teams)" 
                options={{
                    title: "Teams",
                    tabBarIcon: ({color}) => <FontAwesome6 name="shield-halved" size={22} color={color} />
                }} />
            <Tabs.Screen name="standings" 
                options={{
                    title: "Standings",
                    tabBarIcon: ({color}) => <FontAwesome6 name="ranking-star" size={20} color={color} />
                }} />
        </Tabs>
    )
}

export default TabsNavigation