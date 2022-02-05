import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'native-base';

import activityClient from 'client/activity';
import stravaClient from 'client/strava';
import { defaultStyles } from 'ui/styles';

import ActivityInputForm from 'ui/components/forms/activity';

/**
 * Component for activity logging screen; provides activity input form
 *
 * @constructor
 */
function LogActivityScreen() {
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

  function onActivitySelected(request) {
    return stravaClient.getActivities(request);
  }

  return (
    <SafeAreaView style={defaultStyles.logActivityScreen}>
      <ScrollView>
        <ActivityInputForm
          activityOptions={state.activityOptions}
          onActivitySelected={onActivitySelected}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default LogActivityScreen;
