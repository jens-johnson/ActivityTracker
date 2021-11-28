import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screens from 'ui/screens';
import { navigationStyles, colors } from 'ui/styles';

const stackNavigator = createMaterialTopTabNavigator();

/**
 * Creates a tap navigator over the applications screens
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function NavigationProvider() {
  return (
    <NavigationContainer style={{ backgroundColor: 'pink' }}>
      <stackNavigator.Navigator
        initialRouteName='Home'
        tabBarPosition='bottom'
        screenOptions={{
          tabBarStyle: navigationStyles.tabBarStyle,
          tabBarItemStyle: navigationStyles.tabBarItemStyle,
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.background
        }}
      >
        <stackNavigator.Screen
          name='Log Activity'
          component={Screens.LogActivity}
          options={{
            tabBarLabel: 'Log Activity',
            tabBarIcon: ({ color, size }) => <Icon name={'pencil-alt'} color={color} size={size} />
          }}
        />
        <stackNavigator.Screen
          name='Home'
          component={Screens.Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name={'home'} color={color} size={size} />
          }}
        />
        <stackNavigator.Screen
          name='Overview'
          component={Screens.Overview}
          options={{
            tabBarLabel: 'Overview',
            tabBarIcon: ({ color, size }) => <Icon name={'running'} color={color} size={size} />
          }}
        />
      </stackNavigator.Navigator>
    </NavigationContainer>
  );
}
