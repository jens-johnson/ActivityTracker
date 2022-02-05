import React from 'react';

import { Select } from 'native-base';

import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

/**
 * Lifting group input; provides selection over lifting groups
 *
 * @param {Object} props - Component props
 * @param {string} props.liftingGroup - The currently selected lifting group
 * @param {Object[]} props.options - Lifting group options to populate the select component
 * @param {Function} props.onValueChange - Callback to execute when the input changes value
 * @param {boolean} props.hidden - True/false if the component is hidden or not
 * @constructor
 */
function LiftingGroup({ liftingGroup, onValueChange, options, hidden }) {
  return !hidden && (
    <FormControlItem isRequired label={'Muscle Group'}>
      <Select
        selectedValue={liftingGroup}
        color={colors.primary}
        onValueChange={onValueChange}
      >
        {
          options.map(group => (
            <Select.Item label={group.label} value={group.uid} key={group.uid} />
          ))
        }
      </Select>
    </FormControlItem>
  );
}

export default LiftingGroup;