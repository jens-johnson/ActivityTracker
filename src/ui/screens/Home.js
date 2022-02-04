import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Container, Image } from 'native-base';

import { defaultStyles } from 'ui/styles';
import logo from 'assets/logo.png';

/**
 * Component for default Home screen
 *
 * @constructor
 * @component
 */
function HomeScreen() {
  return (
    <SafeAreaView style={defaultStyles.page}>
      <Container>
        <Image alt={''} source={logo} style={defaultStyles.image} />
        <StatusBar style={'auto'} />
      </Container>
    </SafeAreaView>
  );
}

export default HomeScreen;
