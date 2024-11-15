import { View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CustomTabBarButton } from './CustomTabBarButton';
import { LinearGradient } from 'expo-linear-gradient';


export function CustomTabBar({key, state, descriptors, navigation }: BottomTabBarProps & { key: string }) {

  return (
    <LinearGradient colors={['transparent','rgba(0,0,0,0.9)']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 0.9 }} style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <CustomTabBarButton
          key={key + route.name}
          onPress={onPress}
          onLongPress={onLongPress}
          isFocused={isFocused}
          routeName={route.name}
          color={isFocused ? "white": "grey"}
          label={label.toString()}
          />
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 0,
        paddingTop: 8,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'transparent',
        left: 0,
        bottom: 0,
        right: 0,
        height: 60



    }
})