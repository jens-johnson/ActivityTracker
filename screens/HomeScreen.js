import React from 'react';
import { Text, Button, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from "expo-status-bar";
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { globalStyles } from '../styles/global';
import logo from '../assets/icon.png';

export default function HomeScreen({ navigation }) {

  return (
    <SafeAreaView style={globalStyles.page}>
      <Image source={logo} style={globalStyles.image}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
