import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';
import { defaultStyles } from 'ui/styles';
import ActivityInputForm from 'ui/components/forms/activity';

/**
 * Activity input screen functional component
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function LogActivityScreen() {
  return (
    <SafeAreaView style={defaultStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm />
      </ScrollView>
    </SafeAreaView>
  )
}
