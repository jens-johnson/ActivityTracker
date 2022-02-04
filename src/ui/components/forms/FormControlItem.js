import React from 'react';
import { FormControl, Text } from 'native-base';

import { formStyles } from 'ui/styles';

export default function FormControlItem(props) {
  return (
    <FormControl isRequired={props.isRequired} style={formStyles.formControl}>
      <FormControl.Label><Text style={formStyles.formControlLabel}>{ props.label }</Text></FormControl.Label>
      { props.children }
    </FormControl>
  );
};
