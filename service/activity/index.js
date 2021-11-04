/**
 * @typedef TrackerActivity
 * @property {string} activity - The label identifying the activity (i.e. 'Running')
 * @property {Date} date - A date object representing the activity (i.e. 2021-10-24T22:37:11.000Z)
 * @property {string} distance - A string representing the activity's distance (i.e. '5')
 * @property {{ hours: number, minutes: number, seconds: number }} duration - An object representing the activity's time durations
 * @property {string} liftingGroup - The label identifying the activity's lifting group for a weightlifting activity (i.e. 'Chest & triceps')
 * @property {number[]} stravaActivity - An array of strava activity uids linked to the activity
 * @property {string} notes - Any notes for the activity
 */

/**
 * @typedef TrackerActivityItem
 * @property {string} id - A uuid identifying the the activity item
 * @property {string} activity - The label identifying the activity item (i.e. 'RUNNING')
 * @property {number} date - The epoch value of the activity's date (i.e. 1635979537)
 * @property {number} duration - The duration of the activity represented in seconds
 * @property {string} liftingGroup - The label identifying the activity's lifting group for a weightlifting activity (i.e. 'Chest & triceps')
 * @property {number[]} stravaActivity - An array of strava activity uids linked to the activity
 * @property {string} notes - Any notes for the activity
 */

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { v4 as uuidV4 } from 'uuid';
import AWSClient from '../../client/aws';
import { AWS_DYNAMODB_ACTIVITIES_TABLE as activitiesTable, AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE as activityOptionsTable } from '@env';

const activitiesTableDynamoDbClient = AWSClient.dynamoDb(activitiesTable);
const activityOptionsTableDynamoDbClient = AWSClient.dynamoDb(activityOptionsTable);

/**
 * Converts a duration object to epoch seconds
 *
 * @param {{ hours: number, minutes: number, seconds: number }} duration - An object representing a time duration
 * @return {number} - The duration represented in seconds
 * @example
 * toSeconds({ hours: 1, minutes: 30, seconds: 20 }) // returns 5420
 */
const toSeconds = duration => (((duration.hours * 60) + duration.minutes) * 60) + duration.seconds;

/**
 * Converts string to a readable label
 *
 * @param {string} string - The input string (i.e. 'BACK_AND_BICEPS')
 * @return {string} - The resulting label as a string (i.e. 'Back & biceps')
 * @example
 * toLabel('BACK_AND_BICEPS') // returns 'Back & biceps'
 */
const toLabel = string => string.charAt(0).toUpperCase() + string.substr(1).toLowerCase()
  .replace(/_/g, ' ')
  .replace(/and/g, '&');

/**
 * Converts a labelled string to an upper-cased DB representation
 *
 * @param {string} string - The input string (i.e. 'Back & biceps')
 * @return {string} - The transformed string (i.e. 'BACK_AND_BICEPS')
 * @example
 * toLabel('Back & biceps') // returns 'BACK_AND_BICEPS'
 */
const fromLabel = string => string.toUpperCase()
  .replace(/ /g, '_')
  .replace(/&/g, 'AND');

/**
 *
 * @param {TrackerActivity} activity - The tracker activity to be converted to a tracker activity item
 * @return {TrackerActivityItem} - The resulting tracker activity item
 */
const toActivityItem = (activity) => {
  if (activity.duration && Object.values(activity.duration).every(v => v > 0)) {
    activity.duration = toSeconds(activity.duration);
  } else {
    delete activity.duration;
  }
  if (activity.distance && !isNaN(Number(activity.distance))) {
    activity.distance = Number(activity.distance)
  } else {
    delete activity.distance;
  }
  if (activity.liftingGroup && activity.liftingGroup !== '') {
    activity.liftingGroup = toLabel(activity.liftingGroup);
  } else {
    delete activity.liftingGroup;
  }
  return {
    ...activity,
    id: uuidV4(),
    activity: fromLabel(activity.activity),
    date: new Date(activity.date).valueOf()
  }
}

/**
 * Transforms a list of tracker activity options
 *
 * @param {Object[]} items - A list of tracker activity options
 * @return {Object[]} - The tracker activity options transformed with labels
 */
const toActivityOptionsItems = (items) => {
  return items.map(item => ({
    ...item,
    ...(item.groups) && { groups: item.groups.values.map(group => toLabel(group)) },
    label: toLabel(item.label),
  }));
}

/**
 * Retrieves an array of tracker activity options from DynamoDB
 *
 * @return {Promise<Object[]>}
 */
const listActivityOptions = () => {
  return Promise.resolve()
    .then(activityOptionsTableDynamoDbClient.getAllItems)
    .then(toActivityOptionsItems);
}

/**
 * Uploads an activity to the DB
 *
 * @param {TrackerActivity} activity - The activity to be uploaded
 * @return {Promise<undefined>}
 */
const uploadActivity = (activity) => {
  return Promise.resolve(activity)
    .then(toActivityItem)
    .then(activitiesTableDynamoDbClient.putItem);
}

export default {
  uploadActivity,
  listActivityOptions
};
