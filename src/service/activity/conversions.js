/**
 * A mapping of Activity keys to metadata about a given activity for usage in components:
 *
 *    • units - Display units for a given activity
 *    • stravaActivityEquivalents - Reverse mapping to Strava Activity Type
 *    • icon - FontAwesome5 icon name
 *    • displayableName - Singular display name for activity
 */
const CONVERSIONS = {
  BK: {
    units: 'mi',
    stravaActivityEquivalents: [
      'Ride',
      'VirtualRide'
    ],
    icon: 'biking',
    displayableName: 'Ride'
  },
  EL: {
    units: 'miles',
    stravaActivityEquivalents: [
      'Elliptical'
    ],
    displayableName: 'Elliptical'
  },
  RN: {
    units: 'mi',
    stravaActivityEquivalents: [
      'Run',
      'VirtualRun'
    ],
    icon: 'running',
    displayableName: 'Run'
  },
  SM: {
    units: 'floors',
    stravaActivityEquivalents: [
      'StairStepper'
    ],
    displayableName: 'Stair'
  },
  SWM: {
    units: 'm',
    stravaActivityEquivalents: [
      'Swim'
    ],
    icon: 'swimmer',
    displayableName: 'Swim'
  },
};

/**
 * Returns a conversion (if exists) for a given Activity to its mappings
 *
 * @param {string} activityKey
 * @return {Object|undefined}
 */
function convert(activityKey) {
  return CONVERSIONS[activityKey];
}

export default convert;
