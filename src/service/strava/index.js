import { dateTypeService } from 'service/types';
import { getLogger } from 'service/logging';
import { convertActivity } from './conversions';

const logger = getLogger('stravaService');

/**
 * Converts a Strava activity to a label object
 *
 * @param {Object} activity
 * @return {{date: string, duration: string, elevation: number, distance: string, heartRate: number, name, icon: string}}
 */
export const toLabel = (activity) => {
  const activityConversion = convertActivity(activity.type);
  const distance = activityConversion !== undefined
    ? `${(activity.distance * activityConversion.conversionFactor).toFixed(2)} ${activityConversion.units}`
    : undefined;
  const { hours, minutes, seconds } = dateTypeService.toDuration(activity.elapsed_time);
  const duration = `${hours >= 1 ? hours + ' hr ': ''}${minutes + ' min '}${seconds + ' sec'}`;
  const elevation = activity.total_elevation_gain && activity.total_elevation_gain > 0
    ? activity.total_elevation_gain
    : undefined;
  const result = {
    name: activity.name,
    date: dateTypeService.formatDateTimeString(activity.start_date, 'h:mm a'),
    distance,
    duration,
    elevation,
    heartRate: activity.average_heartrate,
    icon: activityConversion.icon || 'dumbbell'
  };
  logger.debug({
    message: 'Converting activity to label',
    event: 'stravaService.toLabel',
    activity,
    result
  });
  return result;
};

/**
 * Filters an activities response for Strava Activities with a given filter
 *
 * @param {Object[]} activities - The activities to be filtered
 * @param {Object} filter - The filter to apply to the response
 * @return {Object[]} - The filtered response
 */
export const toGetActivitiesResponse = (activities, filter = {}) => {
  if (filter.activity) {
    activities = activities.filter(activity => convertActivity(activity.type)?.trackerActivityKey === filter.activity.activityUid);
  }
  return activities;
};

export default {
  toLabel,
  toGetActivitiesResponse
};
