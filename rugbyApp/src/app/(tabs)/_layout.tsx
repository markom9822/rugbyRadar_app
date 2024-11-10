import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { Tabs } from "expo-router"
import {MaterialCommunityIcons, FontAwesome6} from '@expo/vector-icons'
import * as SystemUI from 'expo-system-ui';
import { CustomTabBar } from "@/store/components/CustomTabBar";


const TabsNavigation = () => {

    return (
        <Tabs tabBar={props => <CustomTabBar {...props} />} screenOptions={{headerShown: false}}>
            <Tabs.Screen 
            name="fixtures" 
            options={{
                title: "Fixtures",
            }} />
            <Tabs.Screen name="(teams)" 
                options={{
                    title: "Teams",
                }} />
            <Tabs.Screen name="standings" 
                options={{
                    title: "Standings",
                }} />
        </Tabs>
    )
}

export default TabsNavigation