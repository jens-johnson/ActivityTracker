import React from 'react';
import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';
import { TimePicker } from 'react-native-simple-time-picker';

function Duration({ duration, onChange, hidden }) {
  return !hidden && (
    <FormControlItem isRequired label={'Duration'}>
      <TimePicker
        value={{ ...duration }}
        onChange={duration => onChange(duration)}
        textColor={colors.primary}
        pickerShows={['hours', 'minutes', 'seconds']}
        hoursUnit={'h'}
        minutesUnit={'m'}
        secondsUnit={'s'}
      />
    </FormControlItem>
  );
}

export default Duration;