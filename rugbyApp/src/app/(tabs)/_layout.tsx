import { Tabs } from "expo-router"
import { CustomTabBar } from "@/store/components/CustomTabBar";


const TabsNavigation = () => {


    return (
        <Tabs tabBar={({ key, ...props }: any) => <CustomTabBar {...props} key={key} />} screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>
            <Tabs.Screen 
            name="(fixtures)" 
            options={{
                title: "Fixtures",
            }} />
            <Tabs.Screen name="teams" 
                options={{
                    title: "Teams",
                }}
                />
            <Tabs.Screen name="standings" 
                options={{
                    title: "Standings",
                }} />
        </Tabs>
    )
}




export default TabsNavigation