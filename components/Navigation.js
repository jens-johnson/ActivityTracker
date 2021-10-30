import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen';
import LogActivityScreen from '../screens/LogActivityScreen';
import tabStyle from '../styles/tabs';
import { colorScheme } from '../styles/global';

const stackNavigator = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: tabStyle.tabBarStyle,
          tabBarItemStyle: tabStyle.tabBarItemStyle,
          tabBarActiveTintColor: colorScheme.secondary,
          tabBarInactiveTintColor: colorScheme.background
        }}
      >
        <stackNavigator.Screen
          name="Log Activity"
          component={LogActivityScreen}
          options={{
            tabBarLabel: "Log Activity",
            tabBarIcon: ({ color, size }) => <Icon name={'pencil-alt'} color={color} size={size} />
          }}
        />
        <stackNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => <Icon name={'home'} color={color} size={size} />
          }}
        />
        <stackNavigator.Screen
          name="Overview"
          component={OverviewScreen}
          options={{
            tabBarLabel: "Overview",
            tabBarIcon: ({ color, size }) => <Icon name={'running'} color={color} size={size} />
          }}
        />
      </stackNavigator.Navigator>
    </NavigationContainer>
  )
}
