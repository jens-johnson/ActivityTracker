import React, { useState } from 'react';
import { ScrollView, VStack, FormControl, Text, Select, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CalendarPicker from 'react-native-calendar-picker';
import { TimePicker } from 'react-native-simple-time-picker';
import activityClient from '../client/activities';

const ACTIVITIES = {
  Weightlifting: {
    label: 'Weightlifting',
    duration: false,
    distance: false
  },
  Running: {
    label: 'Running',
    duration: true,
    distance: true,
    distanceUnits: 'mi'
  },
  Biking: {
    label: 'Biking',
    duration: true,
    distance: true,
    distanceUnits: 'mi'
  },
  Swimming: {
    label: 'Swimming',
    duration: true,
    distance: true,
    distanceUnits: 'm'
  }
};

const LIFTING_GROUPS = {
  'Full Body': {
    label: 'Full Body'
  },
  'Chest & Triceps': {
    label: 'Chest & Triceps'
  },
  'Shoulders & Chest': {
    label: 'Shoulders & Chest'
  },
  'Back & Biceps': {
    label: 'Back & Biceps'
  }
};

export default function ActivityInputForm() {
  const [state, setState] = useState({
    formData: {
      date: new Date().toDateString(),
      duration: {
        seconds: 0,
        minutes: 0,
        hours: 0
      },
      distance: '',
      activity: '',
      liftingGroup: '',
      notes: ''
    },
    display: {
      duration: false,
      distance: false,
      liftingGroups: false,
      distanceUnits: ''
    },
    loading: false
  });

  const getActivityInputs = () => {
    return Object.entries(ACTIVITIES).map((activity, _) => {
      return (<Select.Item label={activity[1].label} value={activity[0]} key={activity[0]} />);
    })
  };

  const getLiftingGroupInputs = () => {
    return Object.entries(LIFTING_GROUPS).map((group, _) => {
      return (<Select.Item label={group[1].label} value={group[0]} key={group[0]} />);
    })
  };

  const formSubmissionEnabled = () => {
    return state.formData.activity
      ? state.formData.activity === 'Weightlifting'
        ? state.formData.liftingGroup
        : (state.formData.duration && state.formData.distance)
      : false;
  };

  const submitFormData = async() => {
    setState({ ...state, loading: true });
    await activityClient.upload(state.formData);
    setState({ ...state, loading: false });
  }

  return (
    <VStack space={2} px={5}>
      <Text fontSize={'xl'} style={{ alignItems: 'center' }}>Log Activity</Text>
      <FormControl isRequired>
        <FormControl.Label>Date</FormControl.Label>
        <CalendarPicker
          onDateChange={date => setState({ ...state, formData: { ...state.formData, date } })}
        />
      </FormControl>
      <FormControl isRequired>
        <FormControl.Label>Activity</FormControl.Label>
        <Select
          selectedValue={state.formData.activity}
          onValueChange={activity => setState({
            ...state,
            display: {
              duration: ACTIVITIES[activity].duration,
              distance: ACTIVITIES[activity].distance,
              liftingGroups: activity === 'Weightlifting',
              distanceUnits: ACTIVITIES[activity].distanceUnits || "",
            },
            formData: {
              ...state.formData,
              activity,
              duration: {
                seconds: 0,
                minutes: 0,
                hours: 0
              },
              distance: '',
              liftingGroup: '',
              notes: ''
            },
          })}
        >
          { getActivityInputs() }
        </Select>
      </FormControl>
      {
        state.display.liftingGroups &&
        <FormControl isRequired>
          <FormControl.Label>Muscle Group</FormControl.Label>
          <Select
            selectedValue={state.formData.liftingGroup}
            onValueChange={liftingGroup => setState({ ...state, formData: { ...state.formData, liftingGroup } })}
          >
            { getLiftingGroupInputs() }
          </Select>
        </FormControl>
      }
      {
        state.display.duration &&
        <FormControl isRequired>
          <FormControl.Label>Duration</FormControl.Label>
          <TimePicker
            value={{ ...state.formData.duration }}
            onChange={value => setState({ ...state, formData: { ...state.formData, duration: { seconds: value.seconds, minutes: value.minutes, hours: value.hours } } })}
            pickerShows={["hours", "minutes", "seconds"]}
            hoursUnit={"h"}
            minutesUnit={"m"}
            secondsUnit={"s"}
          />
        </FormControl>
      }
      {
        state.display.distance &&
        <FormControl isRequired>
          <FormControl.Label>Distance</FormControl.Label>
          <Input
            value={state.formData.distance}
            onChangeText={distance => setState({ ...state, formData: { ...state.formData, distance } })}
            InputRightElement={
              <Text>{state.display.distanceUnits}</Text>
            }
            type={"number"}
          />
        </FormControl>
      }
      <FormControl>
        <FormControl.Label>Notes</FormControl.Label>
        <Input
          value={state.formData.notes}
          onChangeText={notes => setState({ ...state, formData: { ...state.formData, notes } })}
          size={'lg'}
        />
      </FormControl>
      <Button
        isDisabled={!formSubmissionEnabled()}
        isLoading={state.loading}
        onPress={() => submitFormData()}
        startIcon={<Icon name={'upload'} color={'white'} size={'sm'} />}
      >
        Submit
      </Button>
    </VStack>
  )
}
