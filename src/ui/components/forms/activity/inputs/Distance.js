import React from 'react';
import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';
import { TimePicker } from 'react-native-simple-time-picker';
import { Input, Text } from 'native-base';

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