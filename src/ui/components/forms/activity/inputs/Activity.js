import React from 'react';
import { Select } from 'native-base';
import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

function Activity({ activity, onValueChange, options }) {
  return (
    <FormControlItem isRequired label={'Activity'}>
      <Select
        selectedValue={activity}
        color={colors.primary}
        onValueChange={onValueChange}
      >
        {
          options.map(activity => (
            <Select.Item label={activity.label} value={JSON.stringify(activity)} key={activity.activityKey} />
          ))
        }
      </Select>
    </FormControlItem>
  );
}

export default Activity;