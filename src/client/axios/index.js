import axios from 'axios';

import logging from 'common/logging';
import { AxiosError, AXIOS_ERROR_CODES } from 'common/errors';

const logger = logging.getLogger('axios-client');

/**
 * Constructs a request URL with optional query params
 *
 * @param {Object} request
 * @param {string} request.url - The request URL
 * @param {Object} request.query - The request query params as key, value mappings (optional)
 * @return {string} - The resulting URL with added query params
 */
function createRequestUrl(request) {
  const {
    url,
    query
  } = request;
  return query
    ? `${url}?${new URLSearchParams(query)}`
    : url;
}

/**
 * Sends a GET request to a given URL using Axios
 *
 * @param {Object} request - Request config, including URL
 * @return {Promise<*, AxiosError>}
 */
function get(request) {
  const endpoint = createRequestUrl(request);
  return axios.get(endpoint)
    .then(response => {
      logger.debug({
        message: 'Axios request successful',
        event: 'get',
        endpoint
      });
      switch (response.status) {
        case (400):
          throw new AxiosError('Bad request', {
            endpoint,
            method: 'GET',
            code: AXIOS_ERROR_CODES.INVALID_REQUEST,
            error
          });
        case (401):
          throw new AxiosError('Unauthorized', {
            endpoint,
            method: 'GET',
            code: AXIOS_ERROR_CODES.UNAUTHORIZED,
            error
          });
        case (403):
          throw new AxiosError('Forbidden', {
            endpoint,
            method: 'GET',
            code: AXIOS_ERROR_CODES.FORBIDDEN,
            error
          });
        default:
          return response;
      }
    }).catch(error => {
      logger.error({
        message: 'Failed to execute axios request',
        event: 'get',
        endpoint,
        error
      });
      throw new AxiosError('Unknown request error', {
        endpoint,
        method: 'GET',
        code: AXIOS_ERROR_CODES.UNKNOWN,
        error
      });
    });
}

/**
 * Sends a POST request to a given URL using Axios
 *
 * @param {Object} request - Request config, including URL
 * @return {Promise<*, AxiosError>}
 */
function post(request) {
  const endpoint = createRequestUrl(request);
  return axios.post(endpoint, request.body)
    .then(response => {
      logger.debug({
        message: 'Axios request successful',
        event: 'post',
        endpoint
      });
      switch (response.status) {
        case (400):
          throw new AxiosError('Bad request', {
            endpoint,
            method: 'POST',
            code: AXIOS_ERROR_CODES.INVALID_REQUEST,
            error
          });
        case (401):
          throw new AxiosError('Unauthorized', {
            endpoint,
            method: 'POST',
            code: AXIOS_ERROR_CODES.UNAUTHORIZED,
            error
          });
        case (403):
          throw new AxiosError('Forbidden', {
            endpoint,
            method: 'POST',
            code: AXIOS_ERROR_CODES.FORBIDDEN,
            error
          });
        default:
          return response;
      }
    }).catch(error => {
      logger.error({
        message: 'Failed to execute axios request',
        event: 'post',
        endpoint,
        error
      });
      throw new AxiosError('Unknown request error', {
        endpoint,
        method: 'POST',
        code: AXIOS_ERROR_CODES.UNKNOWN,
        error
      });
    });
}

export default {
  get,
  post
};
