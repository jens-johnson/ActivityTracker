import { LogBox } from 'react-native';

import logging from 'common/logging';

const logger = logging.getLogger('ui-dev-utils');

/**
 * Default warnings to be suppressed in the Expo console
 */
const DEFAULT_WARNINGS = [
  {
    pattern: 'Please pass alt prop to Image component',
    description: 'Home screen image causing unknown error; alt prop is being supplied',
    trace: 'src/ui/screens/Home.js'
  },
  {
    pattern: 'Require cycle: src/ui/components/forms/activity/index.js',
    description: 'Require cycle circular dependency',
    trace: 'src/ui/components/forms/activity/index.js'
  },
  {
    pattern: 'If you do not provide children, you must specify an aria-label',
    description: 'Radio buttons do not have Aria label',
    trace: 'src/ui/components/forms/activity/StravaActivityItem.js'
  }
];

/**
 * Suppresses warnings in the Expo console
 *
 * @param {Object[]} warnings
 */
function suppressWarnings(warnings = []) {
  logger.debug({
    event: 'suppressWarnings',
    default: DEFAULT_WARNINGS,
    additional: warnings
  });
  //LogBox.ignoreLogs([ ...DEFAULT_WARNINGS.map(({ pattern }) => pattern), ...warnings.map(({ pattern }) => pattern) ]);
}

export default {
  suppressWarnings
};
