import { v4 as uuidV4 } from 'uuid';

import types from 'utils/types';
import convertActivity from 'service/activity/conversions';
import convert from './conversions';

/**
 *
 * @param {Object} item
 * @return {{elevation: number, duration: {seconds: number, hours: number, minutes: number}, activityKey: string, distance: {distance: number, units: string}, heartRate: number, name: string, icon: string, id: string, timeOfDay: string}}
 */
function toActivity(item) {
  const {
    type,
    start_date,
    total_elevation_gain,
    distance,
    average_heartrate,
    moving_time
  } = item;
  const {
    activityKey,
    metric,
    icon
  } = convert(type);
  return {
    id: uuidV4(),
    timeOfDay: types.dates.datetime.toTimeOfDay(start_date),
    activityKey,
    name: convertActivity(activityKey)?.displayableName,
    elevation: types.measurements.distance.toString({
      distance: types.measurements.meters.toFeet(total_elevation_gain),
      units: 'ft'
    }),
    distance: {
      distance: metric ? distance : types.measurements.meters.toMiles(distance),
      units: metric ? 'm' : 'mi'
    },
    heartRate: average_heartrate,
    duration: types.dates.duration.toObject(moving_time),
    icon
  };
}

export default {
  toActivity
};
