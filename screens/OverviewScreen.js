import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import { Container } from 'native-base';

export default function OverviewScreen({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.page}>
      <Container>
        <Text>About</Text>
      </Container>
    </SafeAreaView>
  )
}
