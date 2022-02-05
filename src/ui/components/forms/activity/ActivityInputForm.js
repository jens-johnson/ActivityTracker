import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { VStack, Center, Text, Heading, Input, Button, Icon } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';

import activityClient from 'client/activity';
import { isWeightLiftingActivity } from 'utils/activities';
import { colors, activityFormStyles } from 'ui/styles';

import Inputs from './inputs';
import FormControlItem from '../FormControlItem';

/**
 * Activity input form component; provides ability to input activity information for a day
 *
 * @param {Object} props - Component props
 * @param {Object[]} activityOptions - Options for activities to select from
 * @param {Function} onActivitySelected - Callback to execute when an activity is selected
 * @constructor
 */
function ActivityInputForm({ activityOptions, onActivitySelected }) {
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
      liftingGroups: [],
      stravaActivities: [],
      activitySelectedHandler: null
    };
  }

  const [ state, setState ] = useState(getDefaultState());

  useEffect(() => {
    setState({ ...state, activitySelectedHandler: onActivitySelected });
  }, [onActivitySelected]);

  useEffect(() => {
    if (state.formData.activity && state.activitySelectedHandler) {
      return state.activitySelectedHandler({
        query: {
          before: moment(state.formData.date).endOf('day').unix(),
          after: moment(state.formData.date).startOf('day').unix()
        },
        filter: {
          activity: state.formData.activity
        }
      })
        .then(stravaActivities => setState({ ...state, stravaActivities }))
        .catch(error => setState({ ...state, error }));
    }
  }, [state.formData.date, state.formData.activity]);

  function setFormData(data) {
    setState({
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

  function activitySelected(activity) {
    activity = JSON.parse(activity);
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
        activity: activity,
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
        <Inputs.Date
          date={state.formData.date}
          onChange={date => setFormData({ date })}
        />
        <Inputs.Activity
          options={activityOptions}
          activity={JSON.stringify(state.formData.activity)}
          onValueChange={activitySelected}
        />
        <Inputs.LiftingGroup
          liftingGroup={state.formData.liftingGroup}
          options={activityOptions?.find(isWeightLiftingActivity)?.groups || []}
          onValueChange={liftingGroup => setFormData({ liftingGroup })}
          hidden={!state.display.liftingGroups}
        />
        <Inputs.StravaActivities
          activities={state.stravaActivities}
          options={activityOptions?.find(isWeightLiftingActivity)?.groups || []}
          onChange={stravaActivity => setFormData({ stravaActivity })}
          hidden={state.stravaActivities.length < 1}
        />
        <Inputs.Duration
          duration={state.formData.duration}
          onChange={duration => setFormData({ duration })}
          hidden={!state.display.duration}
        />
        <Inputs.Distance
          distance={state.formData.distance}
          onChange={distance => setFormData({ distance })}
          units={state.display.distanceUnits}
          hidden={!state.display.distance}
        />
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
