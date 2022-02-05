import React from 'react';

import { Radio } from 'native-base';

import FormControlItem from '../../FormControlItem';
import StravaActivitySelection from './StravaActivitySelection';

/**
 * Strava activities input; provides radio toggle over a set of strava activities
 *
 * @param {Object} props - Component props
 * @param {Object[]} props.activities - The Strava activities to provide selection over
 * @param {Function} props.onChange - Callback to execute when the input changes value
 * @param {boolean} props.hidden - True/false if the component is hidden or not
 * @constructor
 */
function StravaActivities({ activities, onChange, hidden }) {
  return !hidden && (
    <FormControlItem label={'Attach Strava Activity:'}>
      <Radio.Group
        name={'Foo'}
        value={activities[0].id}
        onChange={activity => onChange(activity)}
        size={'lg'}
      >
        {
          activities.map(activity => (
            <StravaActivitySelection activity={activity} key={activity.id} />
          ))
        }
      </Radio.Group>
    </FormControlItem>
  );
}

export default StravaActivities;