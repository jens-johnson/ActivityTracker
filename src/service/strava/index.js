import { dateTypeService } from 'service/types';
import { getLogger } from 'service/logging';
import ACTIVITY_TYPE_CONVERSIONS from './conversions';

const logger = getLogger('stravaService');

/**
 * Creates a label for a given strava activity
 *
 * @param {StravaActivity} activity
 * @return {string}
 */
export const toLabel = (activity) => {
  const date = dateTypeService.formatDateTimeString(activity.start_date);
  const distance = ACTIVITY_TYPE_CONVERSIONS[activity.type] !== undefined
    ? `, ${(activity.distance * ACTIVITY_TYPE_CONVERSIONS[activity.type].conversionFactor).toFixed(2)}${ACTIVITY_TYPE_CONVERSIONS[activity.type].units}`
    : undefined;
  const result = ` ${activity.name} (${date}${distance || ''})`;
  logger.debug({
    message: 'Converting activity to label',
    event: 'stravaService.toLabel',
    activity,
    result,
    resultParameters: {
      name: activity.name,
      date,
      distance
    }
  });
};

const stravaService = {
  toLabel
};

export default stravaService;
