import axios from 'axios';
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } from '@env';

const STRAVA_BASE_URL = 'https://www.strava.com';
const STRAVA_AUTH_URL = new URL('/oauth/token', STRAVA_BASE_URL);
const STRAVA_API_URL = new URL('/api/v3', STRAVA_BASE_URL);

const generateQueryString = (queryParams) => {
  return Object.entries(queryParams)
    .map(([ key, value ]) => `${key}=${value}`)
    .join('&');
}

const getActivities = (params) => {
  return authenticate()
    .then(access_token => axios.get(`${STRAVA_API_URL}/athlete/activities?${generateQueryString({...params, access_token: access_token})}`))
    .then(({ data }) => data)
    .catch(_ => []);
}

const authenticate = () => {
  const authUrlWithParams = `${STRAVA_AUTH_URL}?client_id=${STRAVA_CLIENT_ID}&client_secret=${STRAVA_CLIENT_SECRET}&refresh_token=${STRAVA_REFRESH_TOKEN}&grant_type=refresh_token`;
  return axios.post(authUrlWithParams)
    .then(({ data: { access_token } }) => access_token)
    .catch(_ => undefined);
}

export default {
  getActivities
};
