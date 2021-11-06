import React from 'react';
import { FormControl, Text } from 'native-base';
import { formStyles } from '../../styles';

/**
 * Functional component creating a <FormControl /> wrapper and label
 *
 * @param {Object} props
 * @param {boolean} props.isRequired - True/false if the form control is required or not
 * @param {string} props.label - Label for the form control
 * @param {JSX.Element[]} props.children - Child components
 * @return {JSX.Element}
 * @constructor
 */
export default function FormControlItem(props) {
  return (
    <FormControl isRequired={props.isRequired} style={formStyles.formControl}>
      <FormControl.Label><Text style={formStyles.formControlLabel}>{ props.label }</Text></FormControl.Label>
      { props.children }
    </FormControl>
  )
}
