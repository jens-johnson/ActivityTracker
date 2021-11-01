import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Container, Image } from 'native-base';
import { defaultStyles } from '../styles';
import logo from '../assets/icon.png';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={defaultStyles.page}>
      <Container>
        <Image source={logo} style={defaultStyles.image}/>
        <StatusBar style="auto" />
      </Container>
    </SafeAreaView>
  );
}
