/**
 * @typedef {string} DateTime - An ISO 8601 datetime string (i.e. '2021-11-04T17:12:07-06:00')
 * @typedef {number} EpochTime - Unix time representation of datetime (i.e. 1636067527137)
 * @typedef {moment.unitOfTime.StartOf} TimePeriod - Moment representation of a time period (i.e. 'day', 'month', etc.)
 * @typedef {string} DateTimeDisplay - Display configuration for datetime object (i.e. 'unix' or 'iso')
 */

import moment from 'moment';
import { getLogger } from 'service/logging';

const logger = getLogger('dateTypeService');

/**
 * Converts a duration object to elapsed seconds
 *
 * @param {{ hours: number, minutes: number, seconds: number }} duration - An object representing a time duration
 * @return {number} - The duration represented in seconds
 * @example
 * toSeconds({ hours: 1, minutes: 30, seconds: 20 }) // returns 5420
 */
export const toSeconds = (duration) => {
  const durationInSeconds = (((duration.hours * 60) + duration.minutes) * 60) + duration.seconds;
  logger.debug({
    message: 'Converting duration to seconds',
    event: 'activityService.toSeconds',
    duration,
    result: durationInSeconds
  });
  return durationInSeconds;
};


/**
 * Converts elapsed seconds to a duration object
 *
 * @param {number} seconds - The elapsed seconds
 * @return {{hours: number, minutes: number, seconds: number}} - The seconds represented as a duration object
 */
export const toDuration = (seconds) => {
  return {
    seconds: seconds % 60,
    minutes: (seconds / 60) >= 60 ? Math.floor((seconds / 60) % 60) : Math.floor(seconds / 60),
    hours: Math.floor(seconds / 3600)
  };
};

/**
 * Gets the datetime object relative to the start of the given time period for the given datetime
 *
 * @param {DateTime|moment.Moment|Date} datetime - The input datetime
 * @param {TimePeriod} timePeriod - The time period to generate a starting datetime for
 * @param {DateTimeDisplay} display - The optional display configuration option for the returned datetime period (default unix)
 * @return {number|string}
 */
export const startOf = (datetime, timePeriod, display = 'epoch') => {
  const value = moment(datetime).startOf(timePeriod);
  const result = display === 'iso'
    ? value.toISOString()
    : display === 'unix'
      ? value.unix()
      : value.valueOf()
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
 * @param {DateTimeDisplay} display - The optional display configuration option for the returned datetime period (default unix)
 * @return {number|string}
 *
 * TODO: Update docs
 */
export const endOf = (datetime, timePeriod, display = 'epoch') => {
  const value = moment(datetime).endOf(timePeriod);
  const result = display === 'iso'
    ? value.toISOString()
    : display === 'unix'
      ? value.unix()
      : value.valueOf()
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
 * Converts an epoch number to a datetime string (ISO 8601 formatted)
 *
 * @param {EpochTime|moment.Moment} epoch - The epoch time
 * @return {DateTime} - The epoch time as a datetime string
 * @example
 * fromEpoch(1636067527137) // returns '2021-11-04T17:12:07-06:00'
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
export const formatDateTimeString = (datetime, format = undefined) => {
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
