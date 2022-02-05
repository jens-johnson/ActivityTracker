/**
 * A mapping of Strava activity types to be used in other components
 *
 *    • metric: T/F if the activity's distance is measured in metric units
 *    • units: A displayable string for the activity's units
 *    • activityKey: Mapping to the Activity equivalent for the Strava activity
 *    • icon: The FontAwesome5 icon name to display for the activity
 */
const CONVERSIONS = {
  Elliptical: {
    metric: false,
    units: 'mi',
    activityKey: 'EL'
  },
  Ride: {
    metric: false,
    units: 'mi',
    activityKey: 'BK',
    icon: 'biking'
  },
  Run: {
    metric: false,
    units: 'mi',
    activityKey: 'RN',
    icon: 'running'
  },
  Swim: {
    metric: true,
    units: 'm',
    activityKey: 'SWM',
    icon: 'swimmer'
  },
  VirtualRide: {
    metric: false,
    units: 'mi',
    activityKey: 'BK',
    icon: 'biking'
  },
  VirtualRun: {
    metric: false,
    units: 'mi',
    activityKey: 'RN',
    icon: 'running'
  }
};

/**
 * Converts a Strava Activity Type to metadata to be used throughout the application
 *
 * @param {string} stravaActivityType
 * @return {Object|undefined}
 */
function convert(stravaActivityType) {
  return CONVERSIONS[stravaActivityType];
}

export default convert;
