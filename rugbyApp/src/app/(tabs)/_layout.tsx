import { colors, fontFamilies, fontSize } from "@/constants/tokens"
import { Tabs } from "expo-router"
import {MaterialCommunityIcons, FontAwesome6} from '@expo/vector-icons'
import * as SystemUI from 'expo-system-ui';
import { CustomTabBar } from "@/store/components/CustomTabBar";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";


const TabsNavigation = () => {


    return (
        <Tabs tabBar={({ key, ...props }: any) => <CustomTabBar {...props} key={key} />} screenOptions={{headerShown: false}}>
            <Tabs.Screen 
            name="fixtures" 
            options={{
                title: "Fixtures",
            }} />
            <Tabs.Screen name="(teams)" 
                options={{
                    title: "Teams",

                }}
                listeners={{tabPress: e => {
                    // Prevent default action
                    e.preventDefault();
                  },}} />
            <Tabs.Screen name="standings" 
                options={{
                    title: "Standings",
                }} />
        </Tabs>
    )
}




export default TabsNavigation