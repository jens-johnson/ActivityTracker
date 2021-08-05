import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen';
import tabStyle from '../styles/tabs';

const stackNavigator = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: tabStyle.tabBarStyle,
          tabBarItemStyle: tabStyle.tabBarItemStyle
        }}
      >
        <stackNavigator.Screen name="Home" component={HomeScreen} />
        <stackNavigator.Screen name="Overview" component={OverviewScreen} />
      </stackNavigator.Navigator>
    </NavigationContainer>
  )
}
