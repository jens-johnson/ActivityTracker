const ACTIVITY_CONVERSIONS = {
  BK: {
    units: 'mi',
    stravaActivityEquivalents: [
      'Ride',
      'VirtualRide'
    ],
    icon: 'biking'
  },
  RN: {
    units: 'mi',
    stravaActivityEquivalents: [
      'Run',
      'VirtualRun'
    ],
    icon: 'running'
  },
  SWM: {
    units: 'm',
    stravaActivityEquivalents: [
      'Swim'
    ],
    icon: 'swimmer'
  }
};

/**
 * Returns a conversion (if exists) for a given activity UID mapping to units, an icon name, and strava activity equivalents
 *
 * @param {string} activityUid
 * @return {Object|undefined}
 */
export const convertActivity = (activityUid) => {
  return ACTIVITY_CONVERSIONS[activityUid];
};
