import logging from 'common/logging';
import transformers from './transformers';
import convert from './conversions';

const logger = logging.getLogger('strava-service');

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
