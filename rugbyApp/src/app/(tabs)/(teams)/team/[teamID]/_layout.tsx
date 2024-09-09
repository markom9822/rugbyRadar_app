import { Stack, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from "@/constants/tokens";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator)

export default function TeamLayout() {
    return (
        <>
        <Stack.Screen options={{title: 'Team Details'}} />
        <TopTabs screenOptions={{
            tabBarLabelStyle: {

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

        </TopTabs>
        </> 
    ) 
}