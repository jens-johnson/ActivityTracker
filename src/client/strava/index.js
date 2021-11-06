/**
 * @typedef StravaActivity
 * @property {number} id - The unique identifier for the activity
 * @property {string} name - The name of the activity (i.e. 'Morning Run')
 * @property {string} start_date - The start date for the activity (i.e. '2018-05-02T12:15:09Z')
 * @property {string} type - String representing the activity's type (i.e. 'VirtualRide')
 * @property {number} distance - The distance of the activity in m (i.e. 5250.5)
 */

import axios from 'axios';
import { getLogger } from 'service/logging';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from '@env';

const logger = getLogger('stravaClient');
const STRAVA_BASE_URL = 'https://www.strava.com';
const STRAVA_AUTH_URL = new URL('/oauth/token', STRAVA_BASE_URL);
const STRAVA_API_URL = new URL('/api/v3', STRAVA_BASE_URL);

/**
 * Generates a query string from an object of key/value mappings of query parameters
 *
 * @param {Object} queryParams - The query parameters to map (i.e. { foo: 'bar', baz: 'qux' })
 * @return {string} - The generated query string (i.e. '?foo=bar&baz=qux')
 */
const generateQueryString = (queryParams) => {
  return Object.entries(queryParams)
    .map(([ key, value ]) => `${key}=${value}`)
    .join('&');
}

/**
 * Makes a call to the Strava API /athlete/activities endpoint to retrieve activities with given query params
 *
 * @param {Object} params
 * @return {Promise<StravaActivity[]>}
 */
const getActivities = (params) => {
  logger.info({
    message: 'Getting activities',
    event: 'stravaClient.getActivities',
    parameters: params
  });
  return authenticate()
    .then(access_token => axios.get(`${STRAVA_API_URL}/athlete/activities?${generateQueryString({...params, access_token: access_token})}`))
    .then(({ data }) => {
      logger.debug({
        message: 'Retrieved activities',
        event: 'stravaClient.getActivities',
        success: true,
        activities: data
      });
      return data;
    })
    .catch(error => {
      logger.debug({
        message: 'Failed to retrieve activities',
        event: 'stravaClient.getActivities',
        success: false,
        error
      });
      return [];
    });
}

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
      logger.debug({
        message: 'Failed to authenticate',
        event: 'stravaClient.authenticate',
        success: false,
        error
      });
      return undefined;
    });
}

export default {
  getActivities
};
