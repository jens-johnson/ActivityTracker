/**
 * A mapping of Strava activity types to be used in other components
 *
 *  conversionFactor: The conversion factor for the units of the Strava activity (i.e. Strava tracks runs in meters, but the app displays them in miles)
 *
 *  units: A displayable string for the activity's units
 *
 *  trackerActivityKey: Mapping to Tracker Activity Item equivalent for the Strava activity
 *
 *  icon: The FontAwesome5 icon name to display for the activity
 */
const ACTIVITY_CONVERSIONS = {
  Elliptical: {
    conversionFactor: 0.00062137119224,
    units: 'mi',
    trackerActivityKey: 'EL'
  },
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
 * Converts a Strava Activity type to its mappings
 *
 * @param {string} stravaActivityType
 * @return {Object|undefined}
 */
export const convertActivity = (stravaActivityType) => {
  return ACTIVITY_CONVERSIONS[stravaActivityType];
};
