/**
 * @typedef GetActivitiesRequest
 * @property {Object} query - An optional object of key/value pairs representing the Strava API compliant query parameters (i.e. { before: 1636484582, after: 1636484567 })
 * @property {Object} filter - An optional filter to filter the GetActivities responses by
 */

import axios from 'axios';
import { getLogger } from 'service/logging';
import { toGetActivitiesResponse } from 'service/strava';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from '@env';

const STRAVA_BASE_URL = 'https://www.strava.com';
const STRAVA_AUTH_URL = new URL('/oauth/token', STRAVA_BASE_URL);
const STRAVA_API_URL = new URL('/api/v3', STRAVA_BASE_URL);

const logger = getLogger('stravaClient');


/**
 * Authenticates over the Strava API to retrieve an access token to make API requests
 *
 * @return {Promise<string>}
 */
const authenticate = () => {
  logger.info({
    message: 'Submitting authentication request',
    event: 'stravaClient.authenticate',
  });
  const authUrlWithParams = `${STRAVA_AUTH_URL}?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`;
  return axios.post(authUrlWithParams)
    .then(({ data: { access_token } }) => {
      logger.debug({
        message: 'Authenticated',
        event: 'stravaClient.authenticate',
        success: true,
        access_token
      });
      return access_token;
    })
    .catch(error => {
      logger.error({
        message: 'Failed to authenticate',
        event: 'stravaClient.authenticate',
        success: false,
        error
      });
      return undefined;
    });
};

/**
 * Makes a call to the Strava API /athlete/activities endpoint to retrieve activities with given query params
 *
 * @param {GetActivitiesRequest} request
 * @return {Promise<Object[]>}
 */
export const getActivities = (request) => {
  logger.info({
    message: 'Getting activities',
    event: 'stravaClient.getActivities',
    request
  });
  return authenticate()
    .then(access_token => axios.get(`${STRAVA_API_URL}/athlete/activities?${new URLSearchParams({ ...request.query, access_token: access_token })}`))
    .then(({ data: activities }) => {
      logger.debug({
        message: 'Retrieved activities',
        event: 'stravaClient.getActivities',
        success: true,
        activities
      });
      return activities;
    })
    .then(activities => toGetActivitiesResponse(activities, request.filter))
    .catch(error => {
      logger.error({
        message: 'Failed to retrieve activities',
        event: 'stravaClient.getActivities',
        success: false,
        error
      });
      return [];
    });
};

export default {
  getActivities
};
