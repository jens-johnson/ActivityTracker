import React from 'react';
import { Checkbox, Text } from 'native-base';
import stravaService from 'service/strava';
import { colors } from 'ui/styles';

/**
 * Component constructor providing an array of <Checkbox /> elements for Strava activities
 *
 * @param {Object} props
 * @param {StravaActivity[]} props.activities
 * @return {JSX.Element[]}
 * @constructor
 */
export default function StravaActivitySelection(props) {
  return props.activities.map(activity =>
    <Checkbox
      value={activity.id}
      size={'sm'}
      style={{ marginBottom: 2 }}
    >
      <Text style={{ color: colors.primary }} fontSize={'xs'}>{ stravaService.toLabel(activity) }</Text>
  </Checkbox>);
}
