import logging from 'common/logging';
import stravaService from 'service/strava';
import axiosClient from 'client/axios';

import config from 'config';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from '@env';

const {
  strava: {
    api: {
      url: STRAVA_API_URL
    },
    auth: {
      url: STRAVA_AUTH_URL
    }
  }
} = config;

const logger = logging.getLogger('strava-client');

function authenticate() {
  const request = {
    url: STRAVA_AUTH_URL,
    query: {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    }
  };
  return axiosClient.post(request)
    .then(({ data: { access_token } }) => {
      logger.debug({
        message: 'Authenticated',
        event: 'authenticate',
        success: true
      });
      return access_token;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to authenticate',
        event: 'authenticate',
        success: false,
        error
      });
      return undefined;
    });
}

function getActivities(request) {
  return authenticate()
    .then(access_token => axiosClient.get({
      url: `${STRAVA_API_URL}/athlete/activities`,
      query: {
        access_token,
        ...request.query
      }
    }))
    .then(({ data: stravaActivityItems }) => {
      logger.debug({
        message: 'Retrieved activities',
        event: 'getActivities',
        success: true,
        activities: stravaActivityItems.length
      });
      return stravaActivityItems;
    })
    .then(stravaActivityItems => stravaService.parseActivitiesResponse({ stravaActivityItems, filter: request.filter }))
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activities',
        event: 'getActivities',
        success: false,
        error
      });
      return [];
    });
}

export default {
  getActivities
};
