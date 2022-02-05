import React from 'react';

import { Input, Text } from 'native-base';

import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

/**
 * Distance input; provides text input for distances
 *
 * @param {Object} props - Component props
 * @param {string} props.distance - The currently selected distance
 * @param {string} props.units - Units to display the distance using
 * @param {Function} props.onChange - Callback to execute when the input changes value
 * @param {boolean} props.hidden - True/false if the component is hidden or not
 * @constructor
 */
function Distance({ distance, units, onChange, hidden }) {
  return !hidden && (
    <FormControlItem isRequired label={'Distance'}>
      <Input
        value={distance}
        onChangeText={distance => onChange(distance)}
        InputRightElement={
          <Text style={{ color: colors.primary }}>{units} </Text>
        }
        keyboardType={'numeric'}
      />
    </FormControlItem>
  );
}

export default Distance;