import React from 'react';
import { FormControl, Text } from 'native-base';
import { activityFormStyles } from '../../styles';

export default function FormControlItem(props) {
  return (
    <FormControl isRequired={props.isRequired} style={activityFormStyles.formControl}>
      <FormControl.Label><Text style={activityFormStyles.formControlLabel}>{ props.label }</Text></FormControl.Label>
      { props.children }
    </FormControl>
  )
}
