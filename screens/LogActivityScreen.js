import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../styles/global';
import { Container, ScrollView } from 'native-base';

import ActivityInputForm from '../components/ActivityInputForm';

export default function LogActivityScreen({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm />
      </ScrollView>
    </SafeAreaView>
  )
}
