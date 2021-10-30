import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Container, Image } from 'native-base';
import { globalStyles } from '../styles/global';
import logo from '../assets/icon.png';

export default function HomeScreen({ navigation }) {

  return (
    <SafeAreaView style={globalStyles.page}>
      <Container>
        <Image source={logo} style={globalStyles.image}/>
        <StatusBar style="auto" />
      </Container>
    </SafeAreaView>
  );
}
