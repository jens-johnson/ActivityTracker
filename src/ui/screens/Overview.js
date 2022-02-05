import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Heading } from 'native-base';

import activityClient from 'client/activity';
import { defaultStyles, overviewScreenStyles } from 'ui/styles';

import { ActivitySummary } from 'ui/components/overview';

/**
 * Default overview screen; provides summary overview of activities
 *
 * @constructor
 */
function OverviewScreen() {
  const isFocused = useIsFocused();

  const [state, setState] = useState({
    summaries: [],
    activitiesForThisPeriod: [],
    error: undefined
  });

  useEffect(() => {
    let isMounted = true;
    activityClient.getActivitySummaries()
      .then(summaries => isMounted ? setState({ ...state, summaries }) : null)
      .catch(error => isMounted ? setState({ ...state, summaries: [], error }) : null);
    activityClient.getActivityMetricsByDate({
      before: new moment().endOf('year').valueOf(),
      after: new moment().startOf('year').valueOf()
    })
      .then(activitiesForThisPeriod => isMounted ? setState({ ...state, activitiesForThisPeriod }) : null)
      .catch(error => isMounted ? setState({ ...state, activitiesForThisPeriod: [], error }) : null);
    return () => { isMounted = false; }
  }, [ isFocused ]);

  return (
    <SafeAreaView style={defaultStyles.page}>
      <Heading fontSize={'4xl'} mt={2} mb={5} style={overviewScreenStyles.heading}>Activities Overview</Heading>
      <ScrollView mt={5}>
        <ActivitySummary summaries={state.summaries}/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default OverviewScreen;
