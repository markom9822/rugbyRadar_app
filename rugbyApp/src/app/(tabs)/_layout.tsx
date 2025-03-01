import { CustomTabBar } from "@/store/components/CustomTabBar";
import { Tabs } from "expo-router";


const TabsNavigation = () => {


    return (
        <Tabs tabBar={({ key, ...props }: any) => <CustomTabBar {...props} key={key} />} screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
            <Tabs.Screen
                name="(fixtures)"
                options={{
                    title: "Fixtures",
                }} />
            <Tabs.Screen name="search"
                options={{
                    title: "Search",
                }} />
        </Tabs>
    )
}




export default TabsNavigation