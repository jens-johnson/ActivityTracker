import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';
import { ActivitySummary } from 'ui/components/overview';
import { defaultStyles } from 'ui/styles';

/**
 * Overview screen functional component
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function OverviewScreen() {
  return (
    <SafeAreaView style={defaultStyles.page}>
      <ScrollView>
        <ActivitySummary />
      </ScrollView>
    </SafeAreaView>
  )
}
