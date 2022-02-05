import React from 'react';

import { Select } from 'native-base';

import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

/**
 * Activity input; provides selection over activity options
 *
 * @param {Object} props - Component props
 * @param {string} props.activity - The currently selected option (stringified from JSON)
 * @param {Function} props.onValueChange - Callback to execute when a new activity is selected
 * @param {Object[]} props.options - Activity options to populate the <Select /> component
 * @constructor
 */
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