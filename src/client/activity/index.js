import activityService from 'service/activity';
import { getLogger } from 'service/logging';

const logger = getLogger('activityClient');

/**
 * Retrieves a mapping of activities by date and boolean true/false for lifting and/or cardio activities completed on that date, i.e. ({ '2021-11-28': { lifting: true, cardio: false } }), used to generate items for Activity Calendar component
 *
 * @param {{ before: number, after: number }} dateRange
 * @return {Promise<Object>}
 */
const retrieveActivitiesByType = (dateRange) => {
  logger.info({
    message: 'Retrieving activities by type',
    event: 'activityClient.retrieveActivitiesByType',
    dateRange
  });
  return activityService.retrieveActivitiesByType(dateRange)
    .then((result) => {
      logger.debug({
        message: 'Retrieved activities by type',
        event: 'activityClient.retrieveActivitiesByType',
        success: true,
        result
      });
      return result;
    })
    .catch((error) => {
      logger.error({
        message: 'Failed to retrieve activities by type',
        event: 'activityClient.retrieveActivitiesByType',
        success: false,
        error
      });
      return {};
    });
};

/**
 * Retrieves an array of tracker activity options from the DB
 *
 * @return {Promise<Object[]>}
 */
const listActivityOptions = () => {
  logger.info({
    message: 'Listing activity options',
    event: 'activityClient.listActivityOptions',
  });
  return activityService.listActivityOptions()
    .then(activityOptions => {
      logger.debug({
        message: 'Listing activity options',
        event: 'activityClient.listActivityOptions',
        success: true,
        activityOptions
      });
      return activityOptions;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to list activity options',
        event: 'activityClient.listActivityOptions',
        success: false,
        error
      });
      return [];
    });
};

/**
 * Uploads an activity to the DB
 *
 * @param {TrackerActivity} activity
 * @return {Promise<void>}
 */
const upload = (activity) => {
  logger.info({
    message: 'Uploading activity',
    event: 'activityClient.upload',
    activity
  });
  return activityService.uploadActivity(activity)
    .then(() => {
      logger.debug({
        message: 'Activity uploaded',
        event: 'activityClient.upload',
        success: true,
        activity
      });
    })
    .catch(error => {
      logger.error({
        message: 'Activity failed to upload',
        event: 'activityClient.upload',
        success: false,
        error,
        activity
      });
      throw error;
    });
};

/**
 * Retrieves activity summaries from the DB
 *
 * @return {Promise<ActivitySummary[]>}
 */
const retrieveActivitySummaries = () => {
  logger.info({
    message: 'Retrieving activity summaries',
    event: 'activityClient.retrieveActivitySummaries',
  });
  return Promise.all(activityService.retrieveActivitySummaries())
    .then((summaries) => {
      logger.debug({
        message: 'Retrieved activity summaries',
        event: 'activityClient.retrieveActivitySummaries',
        success: true,
        summaries
      });
      return summaries;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activity summaries',
        event: 'activityClient.retrieveActivitySummaries',
        success: false,
        error
      });
      return [];
    });
}

export default {
  upload,
  listActivityOptions,
  retrieveActivitiesByType,
  retrieveActivitySummaries
};
