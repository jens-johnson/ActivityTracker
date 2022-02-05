import React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';

import FormControlItem from '../../FormControlItem';

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