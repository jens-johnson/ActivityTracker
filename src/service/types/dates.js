/**
 * @typedef {string} DateTime - An ISO 8601 datetime string (i.e. '2021-11-04T17:12:07-06:00')
 * @typedef {number} EpochTime - Unix time representation of datetime (i.e. 1636067527137)
 * @typedef {moment.unitOfTime.StartOf} TimePeriod - Moment representation of a time period (i.e. 'day', 'month', etc.)
 * @typedef {string} DateTimeDisplay - Display configuration for datetime object (i.e. 'unix' or 'iso'
 */

import moment from 'moment';
import { getLogger } from 'service/logging';

const logger = getLogger('dateTypeService');

/**
 * Gets the datetime object relative to the start of the given time period for the given datetime
 *
 * @param {DateTime|moment.Moment|Date} datetime - The input datetime
 * @param {TimePeriod} timePeriod - The time period to generate a starting datetime for
 * @param {DateTimeDisplay} - The optional display configuration option for the returned datetime period
 * @return {number|string}
 */
export const startOf = (datetime, timePeriod, display='unix') => {
  const value = moment(datetime).startOf(timePeriod);
  const result = display === 'unix'
    ? value.unix()
    : value.toISOString();
  logger.debug({
    message: 'Getting start of time period for datetime object',
    event: 'dateTypeService.startOf',
    parameters: {
      datetime,
      timePeriod,
      display
    }
  });
  return result;
};

/**
 * Gets the datetime object relative to the end of the given time period for the given datetime
 *
 * @param {DateTime|moment.Moment|Date} datetime - The input datetime
 * @param {TimePeriod} timePeriod - The time period to generate an ending datetime for
 * @param {DateTimeDisplay} - The optional display configuration option for the returned datetime period
 * @return {number|string}
 */
export const endOf = (datetime, timePeriod, display='unix') => {
  const value = moment(datetime).endOf(timePeriod);
  const result = display === 'unix'
    ? value.unix()
    : value.toISOString();
  logger.debug({
    message: 'Getting end of time period for datetime object',
    event: 'dateTypeService.endOf',
    parameters: {
      datetime,
      timePeriod,
      display
    }
  });
  return result;
};

/**
 * Converts a datetime string to epoch
 *
 * @param {DateTime|moment.Moment|Date} datetime - The datetime string to be converted
 * @return {EpochTime} - The datetime string converted to epoch epoch time
 * @example
 * toEpoch('2021-11-04T17:12:07-06:00') // returns 1636067527137
 */
export const toEpoch = (datetime) => {
  const result = moment(datetime).unix();
  logger.debug({
    message: 'Converting datetime to unix',
    event: 'dateTypeService.toEpoch',
    result,
    datetime
  });
  // noinspection JSValidateTypes
  return result;
};

/**
 * Converts an epoch number to a datetime string (ISO 8601 formatted)
 *
 * @param {EpochTime|moment.Moment} epoch - The epoch time
 * @return {DateTime} - The epoch time as a datetime string
 * @example
 * fromEpoch(1636067527137) // returns '2021-11-04T17:12:07-06:00'
 * fromEpoch(1636067527137, 'h:mma') // returns '5:12pm'
 */
export const fromEpoch = (epoch) => {
  const result = moment(epoch).toISOString();
  logger.debug({
    message: 'Converting unix to datetime',
    event: 'dateTypeService.fromEpoch',
    result,
    epoch
  });
  return result;
};

/**
 * Formats a datetime string using a format string
 *
 * @param {DateTime|moment.Moment|Date} datetime - The datetime string to be formatted
 * @param {string} format - An optional string of tokens to format the datetime string using
 * @see https://momentjs.com/docs/#/displaying/format/
 * @return {string} - The formatted datetime string
 * @example
 * formatDateTimeString('2021-11-04T17:12:07-06:00') // returns '2021-11-04T17:12:07-06:00'
 * formatDateTimeString('2021-11-04T17:12:07-06:00', 'h:mma') // returns '5:12pm'
 */
export const formatDateTimeString = (datetime, format=undefined) => {
  const result = moment(datetime).format(format);
  logger.debug({
    message: 'Formatting datetime string',
    event: 'dateTypeService.formatDateTimeString',
    result,
    datetime,
    format
  });
  return result;
};
