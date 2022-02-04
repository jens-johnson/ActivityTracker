import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';

import activityClient from 'client/activity';
import { defaultStyles } from 'ui/styles';

import ActivityInputForm from 'ui/components/forms/activity';

/**
 * Activity input screen functional component
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function LogActivityScreen() {
  const [ state, setState ] = useState({
    activityOptions: []
  });

  useEffect(async() => {
    activityClient.getActivityOptions()
      .then(activityOptions => setState({ activityOptions }));
  }, []);

  return (
    <SafeAreaView style={defaultStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm activityOptions={state.activityOptions} />
      </ScrollView>
    </SafeAreaView>
  )
}
