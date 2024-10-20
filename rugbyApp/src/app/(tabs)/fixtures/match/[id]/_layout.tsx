import { Stack, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fontFamilies } from "@/constants/tokens";

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator)

export default function MatchLayout() {
    return (
        <>
        <Stack.Screen options={{title: 'Match Details'}} />
        <TopTabs screenOptions={{
            tabBarLabelStyle: {
                fontFamily: fontFamilies.bold

            },
            tabBarStyle: { backgroundColor: colors.altBackground  },
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