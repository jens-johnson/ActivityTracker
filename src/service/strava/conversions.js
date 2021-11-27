const ACTIVITY_CONVERSIONS = {
  Ride: {
    conversionFactor: 0.00062137119224,
    units: 'mi',
    trackerActivityKey: 'BK',
    icon: 'biking'
  },
  Run: {
    conversionFactor: 0.00062137119224,
    units: 'mi',
    trackerActivityKey: 'RN',
    icon: 'running'
  },
  Swim: {
    conversionFactor: 1,
    units: 'm',
    trackerActivityKey: 'SWM',
    icon: 'swimmer'
  },
  VirtualRide: {
    conversionFactor: 0.00062137119224,
    units: 'mi',
    trackerActivityKey: 'BK',
    icon: 'biking'
  },
  VirtualRun: {
    conversionFactor: 0.00062137119224,
    units: 'mi',
    trackerActivityKey: 'RN',
    icon: 'running'
  }
};

/**
 * Converts a Strava Activity Type to an object containing a conversion factor for the Strava activity distance, distance units, TrackerActivityOption UID, and icon
 *
 * @param {string} stravaActivityType
 * @return {Object|undefined}
 */
export const convertActivity = (stravaActivityType) => {
  return ACTIVITY_CONVERSIONS[stravaActivityType];
}
