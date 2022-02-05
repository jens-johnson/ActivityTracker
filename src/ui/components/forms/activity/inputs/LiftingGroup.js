import React from 'react';
import { Select } from 'native-base';
import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

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