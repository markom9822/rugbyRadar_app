import { Stack, withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
const TopTabs = withLayoutContext(Tab.Navigator)

export default function TeamLayout() {
    return (
        <>
        <Stack.Screen options={{title: 'Team Details'}} />
        <TopTabs screenOptions={{
            tabBarLabelStyle: {

            },
            tabBarStyle: { backgroundColor: '#d9dbde' },
            tabBarInactiveTintColor: 'grey',
            tabBarActiveTintColor: 'black',
            tabBarIndicatorStyle: {
                backgroundColor: 'black',
                height: 3
            }
        }}>

        <TopTabs.Screen name="index" options={{title: 'Summary'}}/>

        </TopTabs>
        </> 
    ) 
}