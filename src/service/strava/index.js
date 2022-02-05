import logging from 'common/logging';
import transformers from './transformers';

const logger = logging.getLogger('strava-service');

/**
 * Parses a Strava API response to transform resulting items using an optional filter
 *
 * @param {Object} params - Request params
 * @param {Object[]} params.stravaActivityItems - The response items
 * @param {Object} params.filter - A filter to filter the response using
 * @return {Object[]}
 */
function parseActivitiesResponse({ stravaActivityItems, filter }) {
  const activities = stravaActivityItems.map(transformers.toActivity);
  const filteredResponse = filter.activity
    ? activities.filter(({ activityKey }) => activityKey === filter.activity.activityKey)
    : activities;
  logger.debug({
    message: 'Returning parsed activities response',
    event: 'parseActivitiesResponse',
    activities: filteredResponse.length,
    filter
  });
  return filteredResponse;
}

export default {
  parseActivitiesResponse
};
