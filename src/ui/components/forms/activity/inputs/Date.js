import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import FormControlItem from '../../FormControlItem';

/**
 * Date input; constructs React Native Datetime Picker
 *
 * @param {Object} props - Component props
 * @param {string} props.date - The currently selected date
 * @param {Function} props.onChange - Callback to execute when a new date is selected
 * @constructor
 */
function Date({ date, onChange }) {
  return (
    <FormControlItem isRequired label={'Date'}>
      <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={'datetime'}
        is24Hour={true}
        display={'inline'}
        themeVariant={'dark'}
        onChange={(_, date) => onChange(date)}
      />
    </FormControlItem>
  );
}

export default Date;