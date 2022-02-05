import React from 'react';

import { Box, Center, HStack, Icon, Progress, Text } from 'native-base';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import types from 'utils/types';
import { colors } from 'ui/styles';

/**
 * Functional component representing a summary item with progress bars for activity summaries
 *
 * @param {Object} props - Component props
 * @param {Object} props.summary - Data describing the summary period including number of days, activities completed, etc.
 * @constructor
 */
function SummaryItem({ summary }) {
  const {
    id,
    timePeriod,
    size,
    count,
    lifting,
    duration
  } = summary;
  return (
    <Box
      key={id}
      mx={10}
    >
      <Text bold fontSize={'2xl'} textAlign={'center'} color={colors.primary}>{ timePeriod.toUpperCase() }</Text>
      <Progress
        value={count}
        min={0}
        max={size}
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
          <Text bold fontSize={'md'} color={colors.primary}>{ types.dates.duration.toString(duration) }</Text>
        </HStack>
        <HStack mt={5}>
          {
            lifting?.count > 0 &&
            <Center mx={1}>
              <Text bold fontSize={'md'} color={colors.secondary}>{ lifting.count } Lift{ lifting.count > 1 ? 's' : '' }</Text>
              <Icon as={FontAwesome5} name={'dumbbell'} color={colors.secondary} size={'sm'} my={1} />
              <Text fontSize={'xs'} color={colors.primary} />
              <Text fontSize={'xs'} color={colors.primary}>{ types.dates.duration.toString(lifting.duration) }</Text>
            </Center>
          }
          {
            summary.activities.map(activity =>
              <Center mx={1} key={activity.id}>
                <Text bold fontSize={'md'} color={colors.secondary}>{ activity.count } { activity.displayableName }{ activity.displayableName && activity.count > 1 ? 's' : '' }</Text>
                <Icon as={FontAwesome5} name={activity.icon || 'burn'} color={colors.secondary} size={'sm'} my={1} />
                <Text fontSize={'xs'} color={colors.primary}>{ types.measurements.distance.toString(activity.distance) }</Text>
                <Text fontSize={'xs'} color={colors.primary}>{ types.dates.duration.toString(activity.duration) }</Text>
              </Center>
            )
          }
        </HStack>
      </Box>
    </Box>
  );
}

export default SummaryItem;