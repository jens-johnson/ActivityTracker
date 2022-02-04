/**
 * A mapping of Strava activity types to be used in other components
 *
 *    conversionFactor: The conversion factor for the units of the Strava activity (i.e. Strava tracks runs in meters, but the app displays them in miles)
 *    units: A displayable string for the activity's units
 *    trackerActivityKey: Mapping to Tracker Activity Item equivalent for the Strava activity
 *    icon: The FontAwesome5 icon name to display for the activity
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

function convert(stravaActivityType) {
  return CONVERSIONS[stravaActivityType];
}

export default convert;
