import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ScrollView, Center, Heading} from 'native-base';
import { useIsFocused } from '@react-navigation/native';

import activityClient from 'client/activity';
import { ActivitySummary } from 'ui/components/overview';

import { defaultStyles, overviewScreenStyles } from 'ui/styles';

function OverviewScreen() {
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    summaries: [],
    activitiesForThisPeriod: [],
    error: undefined
  });
  useEffect(() => {
    activityClient.getActivitySummaries()
      .then(summaries => {
        setState({ ...state, summaries })
      })
      .catch(error => {
        setState({ ...state, summaries: [], error })
      });
    activityClient.getActivitySummariesByDate({
      before: new moment().endOf('year').valueOf(),
      after: new moment().startOf('year').valueOf()
    })
      .then(activitiesForThisPeriod => {
        setState({ ...state, activitiesForThisPeriod })
      })
      .catch(error => {
        setState({ ...state, activitiesForThisPeriod: [], error })
      });
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
