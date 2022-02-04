import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { Radio, Text, Container, HStack, VStack, Icon } from 'native-base';

import { colors } from 'ui/styles';

function StravaActivitySelection({ activities }) {
  return activities.map(activity => {
    const {
      timeOfDay,
      icon,
      name,
      heartRate,
      duration,
      distance,
      elevation
    } = activity;
    return (
      <Radio
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
                timeOfDay &&
                <HStack>
                  <Icon as={FontAwesome5} name={'clock'} color={colors.secondary} size={'xs'} />
                  <Text color={colors.primary} mx={2} fontSize={'xs'}>{ timeOfDay }</Text>
                </HStack>
              }
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
                  <Text color={colors.primary} mx={2} fontSize={'xs'}>{ `${`${duration.hours}`.padStart(2, '0')}:${duration.minutes}:${`${duration.seconds}`.padEnd(2, '0')}` }</Text>
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
    )
  });
}

export default StravaActivitySelection;
