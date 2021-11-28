/**
 * TODO: Work in Progress
 */

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Box, Text, View } from 'native-base';
import { colors } from 'ui/styles';

const TEST_ITEMS = {
  '2021-11-26': [
    { activity: 'Run', start: moment(new Date(1637140920000)).format('HH:mm a'), end: moment(new Date(1638009021000)).format('HH:mm a') }
  ]
};

const MOCK_TEST_ACTIVITIES_FUNCTION = ({ dateString }) => {
  return Promise.resolve()
    .then(() => ({
      [dateString]: {
        activity: 'Running',
        start: '11:15am',
        finish: '12:45pm',
        distance: '11.13 mi'
      }
    }));
}

function AgendaItem({ item }) {
  console.log('rendering', item)
  return (
    <Box style={{ backgroundColor: 'transparent' }} mt={2}>
      <Text>Test</Text>
      <Text bold color={'pink'}>{ item.activity }</Text>
      <Text>{ item.start } - { item.end }</Text>
    </Box>
  )
};

export default function ActivitiesAgenda() {
  const today = moment();
  const [ state, setState ] = useState({
    days: {},
    fetchActivitiesFunction: (date) => MOCK_TEST_ACTIVITIES_FUNCTION(date),
    refreshing: false
  });
  const fetchActivities = (date) => {
    setState({
      ...state,
      refreshing: true
    });
    return state.fetchActivitiesFunction(date)
      .then((result) => {
        console.log('Setting state', Object.keys(state.days))
        return setState({
          ...state,
          days: {
            ...state.days,
            ...result
          },
          refreshing: false
        });
      })
      .then(() => {
        console.log('state is now set', Object.keys(state.days));
      })
  };
  return (
    <Agenda
      testID={'ActivitiesAgenda'}
      pastScrollRange={1}
      futureScrollRange={1}
      loadItemsForMonth={(date) => fetchActivities(date)}
      minDate={today.subtract(1, 'month').format('YYYY-MM-DD')}
      maxDate={today.add(1, 'month').format('YYYY-MM-DD')}
      style={{ width: '100%', height: '100%' }}
      items={state.days}
      showClosingKnob={true}
      refreshing={state.refreshing}
      renderItem={(item, firstItemInDay) => console.log('rendering', item, firstItemInDay)}
    />
  );
};
