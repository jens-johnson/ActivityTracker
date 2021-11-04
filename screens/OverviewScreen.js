import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';
import { ActivitySummary } from '../components/overview';
import { defaultStyles } from '../styles';

export default function OverviewScreen({ navigation }) {
  return (
    <SafeAreaView style={defaultStyles.page}>
      <ScrollView>
        <ActivitySummary />
      </ScrollView>
    </SafeAreaView>
  )
}
