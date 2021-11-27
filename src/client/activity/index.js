import activityService from 'service/activity';
import { getLogger } from 'service/logging';

const logger = getLogger('activityClient');

// TODO: Document
const listActivitiesByType = (query) => {
  logger.info({
    message: 'Listing activities by type',
    event: 'activityClient.listActivityOptions',
    query
  });
  return activityService.listActivitiesByType(query);
}

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
 * @return {*}
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
  listActivitiesByType,
  retrieveActivitySummaries
};
