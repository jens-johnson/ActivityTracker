import logging from 'common/logging';
import activityService from 'service/activity';

const logger = logging.getLogger('activity-client');

/**
 * Returns activity metrics for a given date range
 *
 * @param {number} before - Epoch value specifying the end of the date range
 * @param {number} after - Epoch value specifying the beginning of the date range
 * @returns {Promise<Object[]>}
 */
function getActivityMetricsByDate({ before, after }) {
  return activityService.getActivityMetricsByDate({ before, after })
      .then(metrics => {
        logger.debug({
          message: 'Successfully retrieved activity metrics by date',
          event: 'getActivityMetricsByDate',
          success: true,
          dates: metrics.length
        });
        return metrics;
      })
      .catch(error => {
        logger.error({
          message: 'Failed to retrieve activity metrics by date',
          event: 'getActivityMetricsByDate',
          success: false,
          error
        });
        return [];
      });
}

/**
 * Retrieves all available activity options
 *
 * @return {Promise<Object[]>}
 */
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

/**
 * Uploads an activity
 *
 * @param {Object} activity
 * @return {Promise<*|Error>}
 */
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

/**
 * Retrieves activity summaries for a default set of date ranges
 *
 * @return {Promise<Object[]>}
 */
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
  getActivityMetricsByDate,
  getActivitySummaries
};
