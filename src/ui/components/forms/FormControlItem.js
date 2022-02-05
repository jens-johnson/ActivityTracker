import React from 'react';

import { FormControl, Text } from 'native-base';

import { formStyles } from 'ui/styles';

/**
 * Wrapper component over Native Base <FormControl />
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isRequired - Configures if form control item is required or not
 * @param {string} props.label - Label for the form control item
 * @param {*[]} props.children - Child components for form control item
 * @constructor
 */
function FormControlItem({ isRequired, label, children }) {
  return (
    <FormControl isRequired={isRequired} style={formStyles.formControl}>
      <FormControl.Label><Text style={formStyles.formControlLabel}>{ label }</Text></FormControl.Label>
      { children }
    </FormControl>
  );
}

export default FormControlItem;
