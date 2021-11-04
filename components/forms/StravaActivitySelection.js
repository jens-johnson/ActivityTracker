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
};

/**
 * Component constructor providing an array of <Checkbox /> elements for Strava activities
 *
 * @param {Object} props
 * @param {StravaActivity[]} props.activities
 * @return {JSX.Element[]}
 * @constructor
 */
export default function StravaActivitySelection(props) {

  /**
   * Creates a label for a given strava activity
   *
   * @param {StravaActivity} activity
   * @return {string}
   */
  const toLabel = (activity) => {
    console.log(activity)
    const date = moment(activity.start_date).format('h:mma');
    const distance = ACTIVITY_TYPE_CONVERSIONS[activity.type] !== undefined
      ? `, ${(activity.distance * ACTIVITY_TYPE_CONVERSIONS[activity.type].conversionFactor).toFixed(2)}${ACTIVITY_TYPE_CONVERSIONS[activity.type].units}`
      : undefined;
    return ` ${activity.name} (${date}${distance || ''})`;
  };

  return props.activities.map(activity =>
    <Checkbox
      value={activity.id}
      size={'sm'}
      style={{ marginBottom: 2 }}
    >
      <Text style={{ color: colors.primary }} fontSize={'xs'}>{ toLabel(activity) }</Text>
  </Checkbox>);
}
