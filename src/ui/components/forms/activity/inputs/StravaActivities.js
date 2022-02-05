import React from 'react';
import { Radio } from 'native-base';

import FormControlItem from '../../FormControlItem';
import StravaActivitySelection from './StravaActivitySelection';

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