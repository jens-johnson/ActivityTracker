import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';

import activityClient from 'client/activity';
import { defaultStyles } from 'ui/styles';

import ActivityInputForm from 'ui/components/forms/activity';

export default function LogActivityScreen() {
  function getDefaultState() {
    return {
      activityOptions: [],
      error: null
    }
  }

  const [ state, setState ] = useState(getDefaultState());

  useEffect(() => {
    let isMounted = true;
    activityClient.getActivityOptions()
      .then(activityOptions => isMounted ? setState({ ...state, activityOptions }) : null)
      .catch(error => isMounted ? setState({ ...state, activityOptions: [], error }) : null);
    return () => { isMounted = false }
  }, []);

  return (
    <SafeAreaView style={defaultStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm activityOptions={state.activityOptions} />
      </ScrollView>
    </SafeAreaView>
  )
}
