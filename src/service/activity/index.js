/**
 * @typedef TrackerActivityOptionItem
 * @property {string} id - UUID representing the activity option
 * @property {string} activityUid - UID representing the activity (i.e. 'RN')
 * @property {boolean} distance - T/F if the activity can be represented in distance metrics
 * @property {boolean} duration - T/F if the activity can be represented in duration metrics
 * @property {{ uid: string, label: string }[]} groups - An array of lifting groups for lifting activities
 */

/**
 * @typedef TrackerActivity
 * @property {{ hours: number, minutes: number, seconds: number }} duration - The activity's duration
 * @property {string} distance - String representation of the activity's distance
 * @property {Date} date - The activity's date
 * @property {TrackerActivityOptionItem} activity - The activity object for the activity
 * @property {string} liftingGroup - A UID representing the lifting group for the activity
 */

/**
 * @typedef TrackerActivityItem
 * @property {string} id - A uuid identifying the the activity item
 * @property {string} activity - The activity UID of the activity (i.e. 'RN')
 * @property {number} date - The epoch (in ms) value of the activity's date (i.e. 1637720016892)
 * @property {number} duration - The duration of the activity represented in seconds (i.e. 1503)
 * @property {string} liftingGroup - The lifting group UID for a weight-lifting activity (i.e. 'CT')
 * @property {number[]} stravaActivity - An array of strava activity UIDs linked to the activity
 * @property {string} notes - Any notes for the activity
 */

/**
 * @typedef ActivitySummary
 * @property {string} id - UUID representing the activity summary
 * @property {string} timePeriod - The name of the time period for the summary (i.e. 'This Week')
 * @property {number} timePeriodSize - The scale of the time period for activities (i.e. 2 activities for one day)
 * @property {{ hours: number, minutes: number, seconds: number }} duration - The sum duration of all activities in the summary period
 * @property {number} count - The count of all activities in the summary time period (i.e. 24)
 * @property {Object} lifts
 * @property {number} lifts.count - The count of all lifts in the summary time period (i.e. 2)
 * @property {number} lifts.duration - The sum duration of all lifts in the summary period in seconds (i.e. 854)
 * @property {{
 *   id: number,
 *   count: number,
 *   duration: number,
 *   distance: {
 *     value: { hours: number, minutes: number, seconds: number },
 *     units: string
 *   },
 *   icon: string
 * }[]} activities - An array of the top N activity types and their metrics for the given time period
 */

import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import lodash from 'lodash';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import AWSClient from 'client/aws';
import { getLogger } from 'service/logging';
import { dateTypeService } from 'service/types';
import { convertActivity } from './conversions';
import { AWS_DYNAMODB_ACTIVITIES_TABLE, AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE } from '@env';

// Number of activity types to be displayed in summaries
const NUMBER_OF_TOP_ACTIVITIES = 4;
// Factor for upper limit of activities to be completed in month per days in that month
const ACTIVITY_THRESHOLD_FACTOR = 1.40;

const logger = getLogger('activityService');
const activitiesTableDynamoDbClient = AWSClient.dynamoDb(AWS_DYNAMODB_ACTIVITIES_TABLE);
const activityOptionsTableDynamoDbClient = AWSClient.dynamoDb(AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE);

/**
 * Generates a keyed object mapping dates to boolean true/false for if a lifting and/or cardio activity was completed that day
 *
 * @param {TrackerActivityItem[]} activities
 * @return {Object}
 */
const toActivitiesByTypeResponse = (activities) => {
  const byDate = lodash.groupBy(activities, activity => moment(activity.date).format('YYYY-MM-DD'));
  const result = {};
  Object.keys(byDate).forEach(date => {
    result[date] = {
      lifting: byDate[date].filter(({ activity }) => activity === 'WL').length > 0,
      cardio: byDate[date].filter(({ activity }) => activity !== 'WL').length > 0,
    }
  });
  logger.debug({
    event: 'activityService.toActivitiesByTypeResponse',
    message: 'Generating activities by type response',
    activities,
    result
  });
  return result;
};

/**
 * Converts an array of activity objects from the DB and a summary object into a transformed activity summary object
 *
 * @param {TrackerActivityItem[]} activities - The activities to be converted
 * @param {Partial<ActivitySummary>} partialSummary - The partial summary object to be transformed
 * @return {ActivitySummary} - The generated summary object
 */
const toActivitySummary = (activities, partialSummary) => {
  const {
    query,
    ...rest
  } = partialSummary;
  const [ lifts, nonLifts ] = lodash.partition(activities, ['activity', 'WL']);
  const topActivities = Object.values(lodash.groupBy(nonLifts, 'activity')).slice(0, NUMBER_OF_TOP_ACTIVITIES);
  const result = {
    ...rest,
    duration: dateTypeService.toDuration(activities.reduce((acc, { duration }) => acc + duration, 0)),
    count: activities.length,
    lifts: {
      duration: dateTypeService.toDuration(lifts.reduce((acc, { duration }) => acc + duration, 0)),
      count: lifts.length
    },
    activities: topActivities.map(activityType => ({
      id: uuidV4(),
      count: activityType.length,
      duration: dateTypeService.toDuration(activityType.reduce((acc, { duration }) => acc + duration, 0)),
      distance: {
        value: activityType.reduce((acc, {distance}) => acc + distance, 0),
        units: convertActivity(activityType[0]?.activity)?.units
      },
      icon: convertActivity(activityType[0]?.activity)?.icon,
      displayableName: convertActivity(activityType[0]?.activity)?.displayableName
    }))
  };
  logger.debug({
    event: 'activityService.toActivitySummary',
    message: 'Generating activity summary from activities',
    activities,
    partialSummary,
    result
  });
  // noinspection JSValidateTypes
  return result;
};

/**
 *
 * @param {TrackerActivity} activity - The Tracker Activity to be converted to a Tracker Activity item
 * @return {TrackerActivityItem} - The resulting Tracker Activity item
 */
const toActivityItem = (activity) => {
  let {
    activity: {
      activityUid
    },
    duration,
    distance,
    date,
    ...rest
  } = activity;

  if (duration) {
    duration = dateTypeService.toSeconds(duration);
  }
  if (distance && !isNaN(Number(distance))) {
    distance = Number(distance);
  } else {
    distance = undefined;
  }
  const result = {
    ...rest,
    id: uuidV4(),
    activity: activityUid,
    date: new Date(date).valueOf(),
    duration: duration && duration > 0 ? duration : undefined,
    liftingGroup: activity.liftingGroup || undefined,
    distance
  };
  logger.debug({
    message: 'Converting activity to activity item',
    event: 'activityService.toActivityItem',
    activity,
    result
  });
  // noinspection JSValidateTypes
  return result;
};

/**
 * Retrieves a mapping of dates to boolean true/false for lifting and/or cardio activities completed on those dates
 *
 * @param {{ before: number, after: number }} dateRange
 * @return {Promise<Object>}
 */
const retrieveActivitiesByType = (dateRange) => {
  logger.info({
    message: 'Retrieving activities by type',
    event: 'activityService.retrieveActivitiesByType',
    dateRange
  });
  return Promise.resolve()
    .then(() => activitiesTableDynamoDbClient.getItemsByDate(dateRange))
    .then(toActivitiesByTypeResponse)
    .then((result) => {
      logger.debug({
        message: 'Retrieved activities by type',
        event: 'activityService.retrieveActivitiesByType',
        success: true,
        result
      });
      return result;
    })
    .catch((error) => {
      logger.error({
        message: 'Failed to retrieve activities by type',
        event: 'activityService.retrieveActivitiesByType',
        success: false,
        error
      });
      throw error;
    });
};

/**
 * Retrieves an array of Tracker Activity Option Items
 *
 * @return {Promise<TrackerActivityOptionItem[]>}
 */
const listActivityOptions = () => {
  logger.info({
    message: 'Listing activity options',
    event: 'activityService.listActivityOptions',
  });
  return Promise.resolve()
    .then(activityOptionsTableDynamoDbClient.getAllItems)
    .then(activityOptionItems => {
      logger.debug({
        message: 'Retrieved activity option items',
        event: 'activityService.listActivityOptions',
        success: true,
        activityOptionItems
      });
      return activityOptionItems;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activity option items',
        event: 'activityService.listActivityOptions',
        success: false,
        error
      });
      throw error;
    });
};

/**
 * Uploads an activity to the DB
 *
 * @param {TrackerActivity} activity - The activity to be uploaded
 * @return {Promise<undefined>}
 */
const uploadActivity = (activity) => {
  logger.info({
    message: 'Uploading activity',
    event: 'activityService.uploadActivity',
    activity
  });
  return Promise.resolve(activity)
    .then(toActivityItem)
    .then(activitiesTableDynamoDbClient.putItem)
    .then(() => {
      logger.debug({
        message: 'Activity uploaded',
        event: 'activityService.uploadActivity',
        success: true
      });
    })
    .catch((error) => {
      logger.error({
        message: 'Activity failed to upload',
        event: 'activityService.uploadActivity',
        success: false,
        error
      });
      throw error;
    });
};

/**
 * Retrieves activity summaries for a pre-defined set of summary periods (i.e. Today, This Week, This Month)
 *
 * @return {Promise<ActivitySummary[]>}
 */
const retrieveActivitySummaries = () => {
  const today = new Date();
  let summaries = [
    {
      id: uuidV4(),
      timePeriod: 'Today',
      timePeriodSize: Math.ceil(ACTIVITY_THRESHOLD_FACTOR),
      query: {
        after: dateTypeService.startOf(today, 'day'),
        before: dateTypeService.endOf(today, 'day')
      }
    },
    {
      id: uuidV4(),
      timePeriod: 'This Week',
      timePeriodSize: Math.ceil(7 * ACTIVITY_THRESHOLD_FACTOR),
      query: {
        after: dateTypeService.startOf(today, 'week'),
        before: dateTypeService.endOf(today, 'week')
      }
    },
    {
      id: uuidV4(),
      timePeriod: 'This Month',
      timePeriodSize: Math.ceil(moment().daysInMonth() * ACTIVITY_THRESHOLD_FACTOR),
      query: {
        after: dateTypeService.startOf(today, 'month'),
        before: dateTypeService.endOf(today, 'month')
      }
    }
  ];
  logger.info({
    message: 'Retrieving activity summaries',
    event: 'activityService.retrieveActivitySummaries',
    summaries
  });
  // noinspection JSValidateTypes
  return summaries.map(summary => Promise.resolve(summary)
      .then(() => activitiesTableDynamoDbClient.getItemsByDate(summary.query)
        .then(activities => {
          logger.debug({
            message: `Retrieved activity summary for summary period ${summary.timePeriod}`,
            event: 'activityService.retrieveActivitySummaries',
            success: true,
            summary,
            activities
          });
          return toActivitySummary(activities, summary);
        })
        .catch(error => {
          logger.error({
            message: `Failed to retrieve activity summary for summary period ${summary.timePeriod}`,
            event: 'activityService.retrieveActivitySummaries',
            success: false,
            summary,
            error
          });
        })));
};

export default {
  uploadActivity,
  listActivityOptions,
  retrieveActivitiesByType,
  retrieveActivitySummaries
};
