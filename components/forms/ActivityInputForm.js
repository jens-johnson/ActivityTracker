import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, Heading, Select, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { colors, activityFormStyles } from '../../styles';
import FormControlItem from './FormControlItem';
import activityClient from '../../client/activities';
import stravaClient from '../../client/strava';

export default function ActivityInputForm() {
  const [activityOptions, setActivityOptions] = useState([]);
  const [liftingOptions, setLiftingOptions] = useState([]);
  const [state, setState] = useState({
    formData: {
      date: new Date(),
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
    loading: false,
    error: null,
    uploaded: false,
    activityOptions: []
  });

  useEffect(async() => {
    const activityOptionResults = await activityClient.listActivityOptions();
    const liftingOptionResults = activityOptionResults.find(activity => activity.label === 'Weightlifting').groups;
    setActivityOptions(activityOptionResults);
    setLiftingOptions(liftingOptionResults);
    const act = await stravaClient.getActivities();
  }, []);

  const resetState = (values) => {
    setState({
      formData: {
        date: new Date(),
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
      loading: false,
      error: null,
      uploaded: true,
      ...values
    });
  };

  const formSubmissionEnabled = () => {
    return state.formData.activity
      ? state.formData.activity === 'Weightlifting'
        ? state.formData.liftingGroup
        : (state.formData.duration && state.formData.distance)
      : false;
  };

  const isFormEmpty = () => {
    return !state.formData.activity
      && !state.formData.notes
  };

  const submitFormData = async() => {
    setState({ ...state, loading: true });
    const error = await activityClient.upload(state.formData);
    resetState({ loading: false, error, uploaded: true });
  };

  return (
    <VStack space={2} px={5}>
      <Center>
        <Heading style={activityFormStyles.heading}>Log Activity</Heading>
        <FormControlItem isRequired label={'Date'}>
          <DateTimePicker
            testID="dateTimePicker"
            value={state.formData.date}
            mode={'datetime'}
            is24Hour={true}
            display="default"
            textColor={colors.primary}
            onChange={(event, date) => setState({ ...state, formData: { ...state.formData, date } })}
          />
        </FormControlItem>
        <FormControlItem isRequired label={'Activity'}>
          <Select
            selectedValue={state.formData.activity}
            color={colors.primary}
            onValueChange={activity => setState({
              ...state,
              display: {
                duration: activityOptions.find(activityOption => activityOption.label === activity).duration,
                distance: activityOptions.find(activityOption => activityOption.label === activity).distance,
                liftingGroups: activity === 'Weightlifting',
                distanceUnits: activityOptions.find(activityOption => activityOption.label === activity).units || "",
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
            {
              activityOptions.map(activity => <Select.Item label={activity.label} value={activity.label} key={activity.id} />)
            }
          </Select>
        </FormControlItem>
        {
          state.display.liftingGroups &&
          <FormControlItem isRequired label={'Muscle Group'}>
            <Select
              selectedValue={state.formData.liftingGroup}
              color={colors.primary}
              onValueChange={liftingGroup => setState({ ...state, formData: { ...state.formData, liftingGroup } })}
            >
              {
                liftingOptions.map(group => <Select.Item label={group} value={group} key={group} />)
              }
            </Select>
          </FormControlItem>
        }
        {
          state.display.duration &&
          <FormControlItem isRequired label={'Duration'}>
            <TimePicker
              value={{ ...state.formData.duration }}
              onChange={value => setState({ ...state, formData: { ...state.formData, duration: { seconds: value.seconds, minutes: value.minutes, hours: value.hours } } })}
              textColor={colors.primary}
              pickerShows={["hours", "minutes", "seconds"]}
              hoursUnit={"h"}
              minutesUnit={"m"}
              secondsUnit={"s"}
            />
          </FormControlItem>
        }
        {
          state.display.distance &&
          <FormControlItem isRequired label={'Distance'}>
            <Input
              value={state.formData.distance}
              onChangeText={distance => setState({ ...state, formData: { ...state.formData, distance } })}
              InputRightElement={
                <Text style={{ color: colors.primary }}>{state.display.distanceUnits} </Text>
              }
              type={"number"}
            />
          </FormControlItem>
        }
        <FormControlItem isRequired label={'Notes'}>
          <Input
            value={state.formData.notes}
            onChangeText={notes => setState({ ...state, formData: { ...state.formData, notes } })}
            size={'lg'}
          />
        </FormControlItem>
        <Button
          isDisabled={!formSubmissionEnabled()}
          isLoading={state.loading}
          onPress={() => submitFormData()}
          startIcon={<Icon name={'upload'} color={colors.primary} size={'sm'} />}
        >
          Submit
        </Button>
        {
          !state.loading && state.error && state.uploaded &&
          <Text style={{ justifyContent: 'center' }}>
            Upload failed due to error: { state.error }
          </Text>
        }
        {
          !state.loading && state.uploaded && isFormEmpty() &&
          <Text style={{ justifyContent: 'center' }}>
            Activity uploaded.
          </Text>
        }
      </Center>
    </VStack>
  )
}
