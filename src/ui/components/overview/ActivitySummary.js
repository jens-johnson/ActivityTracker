import React from 'react';
import {Heading, VStack, Text, Center, HStack, CircularProgress, Square, Icon, Progress, Box} from 'native-base';
import { overviewScreenStyles, colors } from 'ui/styles';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

/**
 * Converts a duration to a displayable label
 *
 * @param {{ hours: number, minutes: number, seconds: number }} duration
 * @return {string}
 */
function displayDuration({ hours, minutes }) {
  return `${hours > 0 ? `${hours} hr ` : ''}${minutes} min`
}

/**
 * Converts a distance value/units to a displayable label
 *
 * @param {{ value: number, units: string }} params
 * @return {string}
 */
function displayDistance({ value, units }) {
  return `${value.toFixed(2)} ${units}`
}

/**
 * Functional component for a summary item
 *
 * @param {Object} props - Component props
 * @param {Object} summary - Summary object to be displayed
 * @return {JSX.Element}
 * @constructor
 */
function SummaryItem({ summary }) {
  return (
    <Box
      key={summary.id}
      size={'container'}
      mx={10}
    >
      <Text bold fontSize={'2xl'} color={colors.primary}>{ summary.timePeriod.toUpperCase() }</Text>
      <Progress
        value={summary.count}
        min={0}
        max={summary.timePeriodSize}
        rounded={0}
        size={'2xl'}
        colorScheme={'secondary'}
        my={5}
      />
      <Box
        alignItems={'center'}
      >
        <HStack>
          <Icon as={MaterialCommunityIcons} name={'progress-clock'} color={colors.primary} size={'sm'} mr={1} />
          <Text bold fontSize={'md'} color={colors.primary}>{ displayDuration(summary.duration) }</Text>
        </HStack>
        <HStack mt={5}>
          {
            summary.lifts?.count > 0 &&
            <Center mx={1}>
              <Text bold fontSize={'md'} color={colors.secondary}>{ summary.lifts?.count }</Text>
              <Icon as={FontAwesome5} name={'dumbbell'} color={colors.secondary} size={'sm'} my={1} />
              <Text fontSize={'xs'} color={colors.primary} />
              <Text fontSize={'xs'} color={colors.primary}>{ displayDuration(summary.lifts?.duration) }</Text>
            </Center>
          }
          {
            summary.activities.map(activity =>
              <Center mx={1} key={activity.id}>
                <Text bold fontSize={'md'} color={colors.secondary}>{ activity.count }</Text>
                <Icon as={FontAwesome5} name={activity.icon} color={colors.secondary} size={'sm'} my={1} />
                <Text fontSize={'xs'} color={colors.primary}>{ displayDistance(activity.distance) }</Text>
                <Text fontSize={'xs'} color={colors.primary}>{ displayDuration(activity.duration) }</Text>
              </Center>
            )
          }
        </HStack>
      </Box>
    </Box>
  );
};

/**
 * Functional component for Activity Summary display
 *
 * @param {Object} props - Component props
 * @param {Object[]} props.summaries - Array of summary objects to be displayed
 * @return {JSX.Element}
 * @constructor
 */
export default function ActivitySummary({ summaries }) {
  return (
    <VStack>
      <Heading fontSize={'4xl'} style={overviewScreenStyles.heading}>At a Glance</Heading>
      <HStack
        justify={'flex-start'}
      >
        {
          summaries.map(summary => <SummaryItem summary={summary}/>)
        }
      </HStack>
    </VStack>
  )
};
