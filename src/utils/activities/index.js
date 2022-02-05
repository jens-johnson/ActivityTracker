const WEIGHTLIFTING_ACTIVITY_KEY = 'WL';

/**
 * Returns true/false if a given Activity is a weightlifting activity or not based on its key
 *
 * @param {Object} activity - The activity being tested
 * @param {string} activity.activityKey - The activity key of the activity
 * @return {boolean} - True/false if the activity is a weightlifting activity or not
 */
function isWeightLiftingActivity({ activityKey }) {
  return activityKey === WEIGHTLIFTING_ACTIVITY_KEY;
}

export {
  isWeightLiftingActivity
};
