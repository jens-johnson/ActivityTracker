import React from 'react';
import { TimePicker } from 'react-native-simple-time-picker';

import { colors } from 'ui/styles';

import FormControlItem from '../../FormControlItem';

/**
 * Duration input; creates a React Native time picker to select activity duration in hours, minutes, seconds
 *
 * @param {Object} props - Component props
 * @param {Object} props.duration - The currently selected duration
 * @param {Function} props.onChange - Callback to execute when the input changes value
 * @param {boolean} props.hidden - True/false if the component is hidden or not
 * @constructor
 */
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