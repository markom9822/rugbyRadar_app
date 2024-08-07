import { colors, fontSize } from "@/constants/tokens"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"
import {FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome6} from '@expo/vector-icons'


const TabsNavigation = () => {

    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: colors.primary,
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
            },
        

        }}>
            <Tabs.Screen 
            name="fixtures" 
            options={{
                title: "Fixtures",
                tabBarIcon: ({color}) => <FontAwesome name="heart" size={20} color={color} />
            }} />
            <Tabs.Screen name="rankings" 
                options={{
                    title: "Rankings",
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name="playlist-play" size={28} color={color} />
                }} />
            <Tabs.Screen name="(teams)" 
                options={{
                    title: "Teams",
                    tabBarIcon: ({color}) => <Ionicons name="musical-notes-sharp" size={24} color={color} />
                }} />
            <Tabs.Screen name="standings" 
                options={{
                    title: "Standings",
                    tabBarIcon: ({color}) => <FontAwesome6 name="users-line" size={20} color={color} />
                }} />
        </Tabs>
    )
}

export default TabsNavigation