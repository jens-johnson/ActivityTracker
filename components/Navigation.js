import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';

const stackNavigator = createMaterialTopTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <stackNavigator.Navigator
        initialRouteName="Home"
        tabBarPosition="bottom"
      >
        <stackNavigator.Screen name="Home" component={HomeScreen} />
        <stackNavigator.Screen name="About" component={AboutScreen} />
      </stackNavigator.Navigator>
    </NavigationContainer>
  )
}
