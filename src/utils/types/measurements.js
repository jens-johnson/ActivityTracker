/**
 * Converts meters to feet
 *
 * @param {number} meters - The measurement in meters to be converted
 * @return {number} - The result in feet
 */
function toFeet(meters) {
  return meters * 3.28084;
}

/**
 * Converts meters to miles
 *
 * @param {number} meters - The measurement in meters to be converted
 * @return {number} - The result in miles
 */
function toMiles(meters) {
  return meters * 0.000621371;
}

/**
 * Formats a distance and a given unit for the distance to a readable string with a given precision (default 2)
 *
 * @param {number} distance - The distance to be displayed
 * @param {string} units - The units to display the distance in
 * @param {number} precision - The precision to round the distance value to (default 2 decimal places)
 * @return {string} - The resulting formatted string
 * @example
 * toString({ distance: 5082.12314, units: 'm', precision: 3 }) // Returns '5082.123 m'
 */
function toString({ distance, units, precision=2 }) {
  return `${distance.toFixed(precision)} ${units}`
}

export default {
  distance: {
    toString
  },
  meters: {
    toFeet,
    toMiles
  }
};
