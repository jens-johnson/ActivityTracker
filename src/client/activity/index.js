import activityService from 'service/activity';
import logging from 'common/logging';

const logger = logging.getLogger('activity-client');

function getActivitySummariesByDate({ before, after }) {
  return activityService.getActivitySummariesByDate({ before, after })
      .then(summaries => {
        logger.debug({
          message: 'Successfully retrieved activity summaries by date',
          event: 'getActivitySummariesByDate',
          success: true,
          dates: summaries.length
        });
        return summaries;
      })
      .catch(error => {
        logger.error({
          message: 'Failed to retrieve activity summaries by date',
          event: 'getActivitySummariesByDate',
          success: false,
          error
        });
        return [];
      });
}

function getActivityOptions() {
  return activityService.getActivityOptions()
      .then(options => {
        logger.debug({
          message: 'Retrieved activity options',
          event: 'getActivityOptions',
          success: true,
          options
        });
        return options;
      })
      .catch(error => {
        logger.error({
          message: 'Failed to retrieve activity options',
          event: 'getActivityOptions',
          success: false,
          error
        });
        return [];
      });
}

function uploadActivity(activity) {
  return activityService.uploadActivity(activity)
      .then(() => {
        logger.debug({
          message: 'Activity uploaded',
          event: 'uploadActivity',
          success: true,
          activity
        });
      })
      .catch(error => {
        logger.error({
          message: 'Activity failed to upload',
          event: 'uploadActivity',
          success: false,
          error,
          activity
        });
        throw error;
      });
}

function getActivitySummaries() {
  return activityService.getActivitySummaries()
      .then(summaries => {
        logger.debug({
          message: 'Retrieved activity summaries',
          event: 'getActivitySummaries',
          success: true,
          summaries: summaries.length
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
        return [];
      });
}

export default {
  uploadActivity,
  getActivityOptions,
  getActivitySummariesByDate,
  getActivitySummaries
};
