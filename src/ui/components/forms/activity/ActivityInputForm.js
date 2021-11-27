import React, { useState, useEffect } from 'react';
import { VStack, Center, Text, Heading, Select, Input, Button, Radio } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TimePicker } from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormControlItem } from 'ui/components/forms';
import StravaActivitySelection from './StravaActivitySelection';
import activityClient from 'client/activity';
import stravaClient from 'client/strava';
import { colors, activityFormStyles } from 'ui/styles';
import { dateTypeService } from 'service/types';

/**
 * Functional component containing activity upload form
 *
 * @param props - Component props
 * @param props.activityOptions - Array of TrackerActivityOptionItems
 * @return {JSX.Element}
 * @constructor
 */
export default function ActivityInputForm({ activityOptions }) {
  /**
   * Generates an empty state
   *
   * @return {Object}
   */
  const getDefaultState = () => {
    return {
      formData: {
        date: new Date(),
        duration: {
          seconds: 0,
          minutes: 0,
          hours: 0
        },
        distance: '',
        activity: '',
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
      activityOptions,
      stravaActivities: []
    };
  };

  const [state, setState] = useState(getDefaultState());

  useEffect(async() => {
    await setStravaActivities();
  }, [state.formData.date, state.formData.activity]);

  /**
   * Sets form data in state with given values
   *
   * @param {Object} values
   */
  const setFormData = (values) => {
    setState({
      ...state,
      formData: {
        ...state.formData,
        ...values
      }
    });
  };

  /**
   * Resets the state with optional given values
   *
   * @param {Object} values
   */
  const resetState = (values) => {
    setState({ ...getDefaultState(), ...values });
  };

  /**
   * Retrieves Strava activities from the Strava client and updates the state with them
   *
   * @return {Promise<void>}
   */
  const setStravaActivities = async () => {
    if (state.formData.activity) {
      setState({
        ...state,
        stravaActivities: await stravaClient.getActivities({
          query: {
            before: dateTypeService.endOf(state.formData.date, 'day', 'unix'),
            after: dateTypeService.startOf(state.formData.date, 'day', 'unix')
          },
          filter: {
            activity: state.formData.activity
          }
        })
      });
    }
  };

  /**
   * Returns true/false if form submission is enabled or not (either a lifting activity is selected, or non-lifting activity and duration and distance)
   *
   * @return {boolean}
   */
  const formSubmissionEnabled = () => {
    return state.formData?.activity
      ? state.formData?.activity?.activityUid === 'WL'
        ? state.formData?.liftingGroup
        : (state.formData?.duration && state.formData?.distance)
      : false;
  };

  /**
   * Returns true/false if the form hasn't been modified on input
   *
   * @return {boolean}
   */
  const isFormEmpty = () => {
    return !state.formData.activity
      && !state.formData.notes
  };

  /**
   * Calls the activity client to upload form data
   *
   * @return {Promise<void>}
   */
  const submitFormData = async() => {
    let error = undefined;
    setState({ ...state, loading: true });
    await activityClient.upload(state.formData)
      .catch(e => {
        error = e;
      });
    resetState({ loading: false, error, uploaded: true });
  };

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
            onChange={(event, date) => setFormData({ date })}
          />
        </FormControlItem>
        <FormControlItem isRequired label={'Activity'}>
          <Select
            selectedValue={state.formData.activity}
            color={colors.primary}
            onValueChange={activity => setState({
              ...state,
              display: {
                duration: activity.duration,
                distance: activity.distance,
                liftingGroups: activity.activityUid === 'WL',
                distanceUnits: activity.units || "",
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
              }
            })}
          >
            {
              activityOptions.map(activity => <Select.Item label={activity.label} value={activity} key={activity.id} />)
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
                [ ...activityOptions ].find(activity => activity.activityUid === 'WL')?.groups.map(group => <Select.Item label={group.label} value={group.uid} key={group.uid} />)
              }
            </Select>
          </FormControlItem>
        }
        {
          state.stravaActivities.length > 0 &&
          <FormControlItem label={'Attach Strava Activity:'}>
            <Radio.Group
              value={state.formData.stravaActivity}
              onChange={value => setFormData({ stravaActivity: value || null })}
              size={'lg'}
            >
              <StravaActivitySelection activities={state.stravaActivities} />
            </Radio.Group>
          </FormControlItem>
        }
        {
          state.display.duration &&
          <FormControlItem isRequired label={'Duration'}>
            <TimePicker
              value={{ ...state.formData.duration }}
              onChange={({ seconds, minutes, hours }) => setFormData({ duration: { seconds, minutes, hours } })}
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
          isDisabled={!formSubmissionEnabled()}
          isLoading={state.loading}
          onPress={() => submitFormData()}
          startIcon={<Icon name={'upload'} color={colors.primary} size={8} />}
          style={{ marginTop: 5 }}
        >
          Submit
        </Button>
        {
          !state.loading && state.error && state.uploaded &&
          <Text style={{ justifyContent: 'center', color: colors.primary, marginTop: 5 }}>
            Upload failed due to error: { state.error }
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
  )
}
