import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, Heading, Select, Input, Button, Radio, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import activityClient from 'client/activity';
import stravaClient from 'client/strava';

import FormControlItem from '../FormControlItem';
import StravaActivitySelection from './StravaActivitySelection';

import { colors, activityFormStyles } from 'ui/styles';

function ActivityInputForm({ activityOptions }) {
  function getDefaultState() {
    return {
      formData: {
        date: new Date(),
        duration: {
          seconds: 0,
          minutes: 0,
          hours: 0
        },
        distance: '',
        activity: {},
        stravaActivity: [],
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
      options: [],
      liftingGroups: [],
      stravaActivities: []
    };
  }

  const [ state, setState ] = useState(getDefaultState());

  useEffect(() => {
    setStravaActivities();
  }, [state.formData.date, state.formData.activity]);

  useEffect(() => {
    setState({ ...state, options: activityOptions })
  }, [activityOptions]);

  function setFormData(data) {
    return setState({
      ...state,
      formData: {
        ...state.formData,
        ...data
      }
    });
  }

  function resetState(data) {
    return setState({ ...getDefaultState(), ...data });
  }

  function setStravaActivities() {
    if (state.formData.activity) {
      stravaClient.getActivities({
        query: {
          before: moment(state.formData.date).endOf('day').unix(),
          after: moment(state.formData.date).startOf('day').unix()
        },
        filter: {
          activity: state.formData.activity
        }
      })
        .then(stravaActivities => setState({
          ...state,
          stravaActivities
        }))
        .catch(error => setState({
          ...state,
          error
        }));
    }
  }

  function onActivitySelected(activity) {
    setState({
      ...state,
      display: {
        duration: activity.duration,
        distance: activity.distance,
        liftingGroups: activity.activityKey === 'WL',
        distanceUnits: activity.units || '',
      },
      formData: {
        ...state.formData,
        activity: JSON.parse(activity),
        duration: {
          seconds: 0,
          minutes: 0,
          hours: 0
        },
        distance: '',
        liftingGroup: '',
        notes: ''
      }
    });
  }

  function isFormSubmissionEnabled() {
    return state.formData?.activity
      ? state.formData.activity?.activityKey === 'WL'
        ? state.formData.liftingGroup
        : (state.formData.duration && state.formData.distance)
      : false;
  }

  function isFormEmpty() {
    return !state.formData.activity && !state.formData.notes;
  }

  function submit() {
    setState({ ...state, loading: true });
    return activityClient.uploadActivity(state.formData)
      .then(() => {
        resetState({ loading: false, uploaded: true });
      })
      .catch(error => {
        resetState({ loading: false, error, uploaded: true });
      });
  }

  return (
    <VStack space={2} px={5}>
      <Center>
        <Heading style={activityFormStyles.heading}>Log Activity</Heading>
        <FormControlItem isRequired label={'Date'}>
          <DateTimePicker
            testID='dateTimePicker'
            value={state.formData.date}
            mode={'datetime'}
            is24Hour={true}
            display={'inline'}
            themeVariant={'dark'}
            onChange={(_, date) => setFormData({ date })}
          />
        </FormControlItem>
        <FormControlItem isRequired label={'Activity'}>
          <Select
            selectedValue={JSON.stringify(state.formData.activity)}
            color={colors.primary}
            onValueChange={onActivitySelected}
          >
            {
              state.options.map(activity => (
                <Select.Item label={activity.label} value={JSON.stringify(activity)} key={activity.activityKey} />
              ))
            }
          </Select>
        </FormControlItem>
        {
          state.display.liftingGroups &&
          <FormControlItem isRequired label={'Muscle Group'}>
            <Select
              selectedValue={state.formData.liftingGroup}
              color={colors.primary}
              onValueChange={liftingGroup => setFormData({ liftingGroup })}
            >
              {
                state.liftingGroups.map(group => (
                  <Select.Item label={group.label} value={group.uid} key={group.uid} />
                ))
              }
            </Select>
          </FormControlItem>
        }
        {
          state.stravaActivities.length > 0 &&
          <FormControlItem label={'Attach Strava Activity:'}>
            <Radio.Group
              value={state.stravaActivities[0].id}
              onChange={stravaActivity => setFormData({ stravaActivity })}
              size={'lg'}
            >
              {
                state.stravaActivities.map(activity => (
                  <StravaActivitySelection activity={activity} />
                ))
              }
            </Radio.Group>
          </FormControlItem>
        }
        {
          state.display.duration &&
          <FormControlItem isRequired label={'Duration'}>
            <TimePicker
              value={{ ...state.formData.duration }}
              onChange={duration => setFormData({ duration })}
              textColor={colors.primary}
              pickerShows={['hours', 'minutes', 'seconds']}
              hoursUnit={'h'}
              minutesUnit={'m'}
              secondsUnit={'s'}
            />
          </FormControlItem>
        }
        {
          state.display.distance &&
          <FormControlItem isRequired label={'Distance'}>
            <Input
              value={state.formData.distance}
              onChangeText={distance => setFormData({ distance })}
              InputRightElement={
                <Text style={{ color: colors.primary }}>{state.display.distanceUnits} </Text>
              }
              keyboardType={'numeric'}
            />
          </FormControlItem>
        }
        <FormControlItem label={'Notes'}>
          <Input
            value={state.formData.notes}
            onChangeText={notes => setFormData({ notes })}
            size={'lg'}
          />
        </FormControlItem>
        <Button
          isDisabled={!isFormSubmissionEnabled()}
          isLoading={state.loading}
          onPress={submit}
          startIcon={<Icon as={FontAwesome5} name={'upload'} color={colors.primary} size={'xs'} />}
          style={{ marginTop: 5 }}
          colorScheme={'secondary'}
        >
          Submit
        </Button>
        {
          !state.loading && state.error && state.uploaded &&
          <Text style={{ justifyContent: 'center', color: colors.primary, marginTop: 5 }}>
            Upload failed due to error
          </Text>
        }
        {
          !state.loading && state.uploaded && isFormEmpty() &&
          <Text style={{ justifyContent: 'center', color: colors.primary, marginTop: 5 }}>
            Activity uploaded.
          </Text>
        }
      </Center>
    </VStack>
  );
}

export default ActivityInputForm;
