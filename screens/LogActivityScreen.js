import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '../styles';
import { ScrollView } from 'native-base';

import { ActivityInputForm } from '../components/forms';

export default function LogActivityScreen({ navigation }) {
  return (
    <SafeAreaView style={defaultStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm />
      </ScrollView>
    </SafeAreaView>
  )
}
