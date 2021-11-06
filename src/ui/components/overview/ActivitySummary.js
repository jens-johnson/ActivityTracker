import React from 'react';
import { Box, Heading, FlatList, HStack, VStack, Text, Center } from 'native-base';
import { overviewScreenStyles } from '../../styles';

const SUMMARIES_MOCK = [
  {
    timePeriod: 'Today',
    activityCount: '2 activities',
    distance: 'Run: 0mi, Bike: 0mi, Swim: 5,500m',
    duration: '3h 18m'
  },
  {
    timePeriod: 'This week',
    activityCount: '10 activities',
    distance: 'Run: 10mi, Bike: 0mi, Swim: 22,825m',
    duration: '12h 42m'
  },
  {
    timePeriod: 'This month',
    activityCount: '45 activities',
    distance: 'Run: 215mi, Bike: 85mi, Swim: 40,851m',
    duration: '125h 12m'
  }
];

const toSummaryItem = ({ item: summary }) => {
  return (
    <Box
      borderBottomWidth={1}
      style={{ marginTop: 10 }}
    >
      <HStack space={3}>
        <Text
          bold
          fontSize={'xl'}
          justifyContent={"flex-start"}
        >
          { summary.timePeriod }
        </Text>
        <VStack
          justifyContent={"flex-end"}
        >
          <Text fontSize={'xs'}>{ summary.activityCount }</Text>
          <Text fontSize={'xs'}>{ summary.distance }</Text>
          <Text fontSize={'xs'}>{ summary.duration }</Text>
        </VStack>
      </HStack>
    </Box>
  )
};

export default function ActivitySummary() {
  return (
    <Center>
      <Heading style={overviewScreenStyles.heading}>Your Activities at a Glance</Heading>
      <FlatList
        data={SUMMARIES_MOCK}
        renderItem={toSummaryItem}
      />
    </Center>
  )
}
