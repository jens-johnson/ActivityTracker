import React from 'react';
import moment from 'moment';
import { Checkbox, Text } from 'native-base';
import { colors } from '../../styles';

const ACTIVITY_TYPE_CONVERSIONS = {
  Ride: {
    conversionFactor: 0.00062137119224,
    units: 'mi'
  },
  Run: {
    conversionFactor: 0.00062137119224,
    units: 'mi'
  },
  Swim: {
    conversionFactor: 1,
    units: 'm'
  },
  VirtualRide: {
    conversionFactor: 0.00062137119224,
    units: 'mi'
  },
  VirtualRun: {
    conversionFactor: 0.00062137119224,
    units: 'mi'
  }
}

export default function StravaActivitySelection(props) {
  const toLabel = (activity) => {
    const date = moment(activity.start_date).format('h:mma');
    const distance = ACTIVITY_TYPE_CONVERSIONS[activity.type]
      ? `, ${(activity.distance * ACTIVITY_TYPE_CONVERSIONS[activity.type].conversionFactor).toFixed(2)}${ACTIVITY_TYPE_CONVERSIONS[activity.type].units}`
      : undefined;
    return ` ${activity.name} (${date}${distance})`;
  }
  return props.activities.map(activity =>
    <Checkbox
      value={activity.id}
      size={'sm'}
      style={{ marginBottom: 2 }}
    >
      <Text style={{ color: colors.primary }} fontSize={'xs'}>{ toLabel(activity) }</Text>
  </Checkbox>);
}
