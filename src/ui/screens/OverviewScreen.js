import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Center } from 'native-base';
import { useIsFocused } from '@react-navigation/native';
import activityClient from 'client/activity';
import { dateTypeService } from 'service/types';
import { ActivitySummary, ActivitiesCalendar } from 'ui/components/overview';
import { defaultStyles } from 'ui/styles';

/**
 * Overview screen functional component
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function OverviewScreen() {
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    summaries: [],
    activitiesForThisPeriod: []
  });
  useEffect(async() => {
    setState({
      summaries: await activityClient.retrieveActivitySummaries(),
      activitiesForThisPeriod: await activityClient.listActivitiesByType({
        before: dateTypeService.endOf(new Date(), 'year'),
        after: dateTypeService.startOf(new Date(), 'year')
      })
    });
  }, [ isFocused ]);
  return (
    <SafeAreaView style={defaultStyles.page}>
      <ScrollView>
        <ActivitySummary summaries={state.summaries}/>
      </ScrollView>
      <ScrollView>
        <Center>
          <ActivitiesCalendar activities={state.activitiesForThisPeriod} />
        </Center>
      </ScrollView>
    </SafeAreaView>
  )
}
