import React from 'react';
import { Radio, Text, Container, HStack, VStack, Icon } from 'native-base';
import stravaService from 'service/strava';
import { colors } from 'ui/styles';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Component constructor providing an array of <Checkbox /> elements for Strava activities
 *
 * @param {Object} props - Component props
 * @param {Object[]} props.activities - Array of TrackerActivities
 * @return {JSX.Element[]}
 * @constructor
 */
export default function StravaActivitySelection({ activities }) {
  return activities.map(activity => {
    const {
      icon,
      name,
      heartRate,
      duration,
      distance,
      elevation
    } = stravaService.toLabel(activity);
    return <Radio
      key={activity.id}
      value={activity.id}
      _text={{ mx: 2 }}
      my={1}
    >
      <Container>
        <HStack alignItems={'center'} mx={2}>
          <Icon as={FontAwesome5} name={icon} color={colors.primary} />
          <VStack mx={2}>
            <Text color={colors.primary} fontSize={'sm'} my={1} bold>{ name || 'Activity' }</Text>
            {
              heartRate &&
              <HStack>
                <Icon as={FontAwesome5} name={'heartbeat'} color={colors.secondary} size={'xs'} />
                <Text color={colors.primary} mx={2} fontSize={'xs'}>{ heartRate } bpm</Text>
              </HStack>
            }
            {
              duration &&
              <HStack>
                <Icon as={FontAwesome5} name={'stopwatch'} color={colors.secondary} size={'xs'} />
                <Text color={colors.primary} mx={2} fontSize={'xs'}>{ duration }</Text>
              </HStack>
            }
            {
              distance &&
              <HStack>
                <Icon as={FontAwesome5} name={'ruler-horizontal'} color={colors.secondary} size={'xs'} />
                <Text color={colors.primary} mx={2} fontSize={'xs'}>{ distance }</Text>
              </HStack>
            }
            {
              elevation &&
              <HStack>
                <Icon as={FontAwesome5} name={'mountain'} color={colors.secondary} size={'xs'} />
                <Text color={colors.primary} mx={2} fontSize={'xs'}>{ elevation } ft</Text>
              </HStack>
            }
          </VStack>
        </HStack>
      </Container>
  </Radio>
  });
}
