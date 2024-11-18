import { Stack, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors, fontFamilies } from "@/constants/tokens";
import * as SystemUI from 'expo-system-ui';

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator)

export default function MatchLayout() {

    SystemUI.setBackgroundColorAsync(colors.background);

    return (
        <>
        <Stack.Screen options={{title: 'Match Details', presentation: 'transparentModal'}} />
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