import { Stack, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fontFamilies } from "@/constants/tokens";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator)

export default function TeamLayout() {
    return (
        <>
        <Stack.Screen options={{title: 'Team Details', animation: 'slide_from_right', animationDuration: 30, presentation: 'transparentModal'}} />
        <TopTabs screenOptions={{
            tabBarLabelStyle: {
                fontFamily: fontFamilies.bold

            },
            tabBarStyle: { backgroundColor: colors.altBackground },
            tabBarInactiveTintColor: 'lightgrey',
            tabBarActiveTintColor: colors.text,
            tabBarIndicatorStyle: {
                backgroundColor: 'white',
                height: 3
            }
        }}>

        <TopTabs.Screen name="index" options={{title: 'Summary'}}/>
        <TopTabs.Screen name="results" options={{title: 'Results / Fixtures'}}/>

        </TopTabs>
        </> 
    ) 
}