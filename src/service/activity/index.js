import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import logging from 'common/logging';
import dynamoClient from 'client/aws/dynamo';
import transformers from './transformers';

import config from 'config';
import { AWS_DYNAMO_DB_ACTIVITIES_TABLE, AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE } from '@env';

const logger = logging.getLogger('activity-service');

function getActivitySummariesByDate({ before, after }) {
  const params = {
    table: AWS_DYNAMO_DB_ACTIVITIES_TABLE,
    before,
    after
  };
  return dynamoClient.getItemsByDate(params)
    .then(transformers.toActivityDateSummary)
    .then(summary => {
      logger.debug({
        message: 'Retrieved activity summaries by date',
        event: 'getActivitySummariesByDate',
        success: true,
        before,
        after,
        dates: summary.length
      });
      return summary;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activity summaries by date',
        event: 'getActivitySummariesByDate',
        success: false,
        before,
        after,
        error
      });
      throw error;
    });
}

function getActivityOptions() {
  const params = {
    table: AWS_DYNAMO_DB_ACTIVITY_OPTIONS_TABLE
  };
  return dynamoClient.getAllItems(params)
    .then(activityOptionItems => activityOptionItems.map(transformers.toActivityOption))
    .then(activityOptions => {
      logger.debug({
        message: 'Retrieved activity options',
        event: 'getActivityOptions',
        success: true,
        activityOptions
      });
      return activityOptions;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activity options',
        event: 'getActivityOptions',
        success: false,
        error
      });
      throw error;
    });
}

function uploadActivity(activity) {
  return Promise.resolve(activity)
    .then(transformers.toActivityItem)
    .then(dynamoClient.putItem)
    .then(() => {
      logger.debug({
        message: 'Activity uploaded',
        event: 'uploadActivity',
        success: true,
        activity
      });
    })
    .catch((error) => {
      logger.error({
        message: 'Activity failed to upload',
        event: 'uploadActivity',
        success: false,
        error
      });
      throw error;
    });
}

function getActivitySummaries() {
  const {
    activity: {
      summaries: {
        dailyActivityThresholdFactor: DAILY_ACTIVITY_THRESHOLD_FACTOR
      }
    }
  } = config;
  const today = new moment();
  const summaries = [
    {
      id: uuidV4(),
      timePeriod: 'Today',
      size: Math.ceil(DAILY_ACTIVITY_THRESHOLD_FACTOR),
      before: today.endOf('day').valueOf(),
      after: today.startOf('day').valueOf()
    },
    {
      id: uuidV4(),
      timePeriod: 'This Week',
      size: Math.ceil(7 * DAILY_ACTIVITY_THRESHOLD_FACTOR),
      before: today.endOf('week').valueOf(),
      after: today.startOf('week').valueOf()
    },
    {
      id: uuidV4(),
      timePeriod: 'This Month',
      size: Math.ceil(today.daysInMonth() * DAILY_ACTIVITY_THRESHOLD_FACTOR),
      before: today.endOf('week').valueOf(),
      after: today.startOf('week').valueOf()
    }
  ];
  return Promise.all(summaries.map(summary => dynamoClient.getItemsByDate({
      table: AWS_DYNAMO_DB_ACTIVITIES_TABLE,
      before: summary.before,
      after: summary.after
    })
    .then(items => transformers.toActivitySummary(items, summary))
  ))
    .then(summaries => {
      logger.debug({
        message: 'Retrieved activity summaries',
        event: 'getActivitySummaries',
        success: true,
        summariesRetrieved: summaries.length
      });
      return summaries;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activity summaries',
        event: 'getActivitySummaries',
        success: false,
        error
      });
      throw error;
    });
}

export default {
  uploadActivity,
  getActivityOptions,
  getActivitySummariesByDate,
  getActivitySummaries
};
