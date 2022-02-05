import lodash from 'lodash';
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';

import types from 'utils/types';
import { isWeightLiftingActivity } from 'utils/activities';
import convert from './conversions';

import config from 'config';

const {
  activity: {
    summaries: {
      activityCategoryLimit: SUMMARY_ACTIVITY_CATEGORY_LIMIT
    }
  }
} = config;

/**
 *
 * @param {Object} item
 * @return {{duration: number, date: number, activityKey: string, distance: number, stravaId: string, liftingGroupKey: string}}
 */
function toActivity(item) {
  const {
    activityKey,
    duration,
    date,
    distance,
    liftingGroupKey,
    stravaId
  } = item;
  return {
    activityKey,
    duration,
    date,
    distance,
    liftingGroupKey,
    stravaId
  };
}

/**
 *
 * @param {Object} item
 * @return {{duration: number, activityKey: string, distance: number, groups: {Object}[], label: string}}
 */
function toActivityOption(item) {
  const {
    activityKey,
    distance,
    duration,
    groups,
    label
  } = item;
  return {
    activityKey,
    distance,
    duration,
    groups,
    label,
    units: convert(activityKey)?.units
  };
}

/**
 *
 * @param {Object} activity
 * @return {{duration: number, activityKey: string, notes: string, distance: number, liftingGroup: string, stravaActivity: (string|null)}}
 */
function toActivityItem(activity) {
  const {
    activity: selectedActivity,
    duration,
    distance,
    stravaActivity,
    liftingGroup,
    notes
  } = activity;
  return {
    activityKey: selectedActivity,
    duration: Number(duration),
    distance: Number(distance),
    stravaActivity: stravaActivity[0] || null,
    liftingGroup,
    notes
  };
}

/**
 *
 * @param {Object[]} items
 * @param {Object} summary
 * @return {{duration: {seconds: number, hours: number, minutes: number}, size: number, lifting: {duration: {seconds: number, hours: number, minutes: number}, count: number}, activities: {duration: {seconds: number, hours: number, minutes: number}, distance: {units: string, value: number}, count: number, icon: string, displayableName: string, id: string}[], timePeriod: string, count: number, id: string}}
 */
function toActivitySummary(items, summary) {
  const {
    id,
    timePeriod,
    size
  } = summary;
  const activities = items.map(toActivity);
  const [ liftingActivities, nonLiftingActivities ] = lodash.partition(activities, ['activityKey', 'WL']);
  const topActivities = Object.values(lodash.groupBy(nonLiftingActivities, 'activity')).slice(0, SUMMARY_ACTIVITY_CATEGORY_LIMIT);
  return {
    id,
    timePeriod,
    size,
    duration: types.dates.duration.toObject(activities.reduce((a, b) => ({ duration: a.duration + b.duration }), { duration: 0 }).duration),
    count: activities.length,
    lifting: {
      count: liftingActivities.length,
      duration: types.dates.duration.toObject(liftingActivities.reduce((a, b) => ({ duration: a.duration + b.duration }), { duration: 0 }).duration)
    },
    activities: topActivities.map(activities => {
      const { units, icon, displayableName } = convert(activities[0]?.activity);
      return {
        id: uuidV4(),
        count: activities.length,
        duration: types.dates.duration.toObject(activities.reduce((a, b) => ({ duration: a.duration + b.duration })).duration),
        distance: {
          value: activities.reduce((a, b) => ({ duration: a.duration + b.duration })),
          units
        },
        icon,
        displayableName
      };
    })
  };
}

/**
 *
 * @param {string} date
 * @param {Object[]} activities
 * @return {{date, lifting: boolean, cardio: boolean}}
 */
function toMetrics(date, activities) {
  return {
    date,
    lifting: activities.some(isWeightLiftingActivity),
    cardio: activities.some(!isWeightLiftingActivity)
  }
}

/**
 *
 * @param {Object[]} items
 * @return {{date: string, lifting: boolean, cardio: boolean}[]}
 */
function toActivityMetrics(items) {
  const activities = items.map(toActivity);
  const byDate = lodash.groupBy(activities, ({ date }) => moment(date).format('YYYY-MM-DD'));
  return Object.keys(byDate).map(date => toMetrics(date, activities));
}

export default {
  toActivitySummary,
  toActivityMetrics,
  toActivityItem,
  toActivityOption
};
