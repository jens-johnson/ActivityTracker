import moment from 'moment';

/**
 * Converts a duration in ms to a duration object describing the cumulative hours, minutes, seconds of the duration
 *
 * @param {number} duration - The duration in ms
 * @return {{seconds: number, hours: number, minutes: number}} - The cumulative duration described in HH, MM, SS
 */
function toDurationObject(duration) {
  return {
    seconds: duration % 60,
    minutes: (duration / 60) >= 60 ? Math.floor((duration / 60) % 60) : Math.floor(duration / 60),
    hours: Math.floor(duration / 3600)
  };
}

/**
 * Converts a duration to a readable string describing the duration in hours and minutes
 *
 * @param {Object|number} duration - The duration being parsed
 * @return {string} - The duration as a string described in hours and minutes
 */
function toDurationString(duration) {
  duration = duration instanceof Object ? duration : toDurationObject(duration);
  return `${duration.hours > 0 ? `${duration.hours}hr ` : ''}${duration.minutes}min`;
}

/**
 * Converts a datetime object to a readable string describing the time of day (formatted as h:mm a) for the datetime
 *
 * @param {Date|string|number} datetime
 * @return {string}
 * @example
 * toTimeOfDay('2022-02-04T18:37:33-07:00') // returns '6:37 pm'
 */
function toTimeOfDay(datetime) {
  return moment(datetime).format('h:mm a');
}

export default {
  duration: {
    toObject: toDurationObject,
    toString: toDurationString
  },
  datetime: {
    toTimeOfDay
  }
};
