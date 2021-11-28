import { LogBox } from 'react-native';
import { getLogger } from 'service/logging';

const logger = getLogger('devUtils');

const DEFAULT_WARNINGS = [
  {
    pattern: 'Please pass alt prop to Image component',
    description: 'Home screen image causing unknown error; alt prop is being supplied',
    trace: 'src/ui/screens/HomeScreen.js'
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
 * Suppresses RN dev warnings in console
 *
 * @param {Object[]} warnings
 */
export const suppressWarnings = (warnings = []) => {
  logger.info({
    event: 'devUtils.suppressWarnings',
    default: DEFAULT_WARNINGS,
    additional: warnings
  });
  LogBox.ignoreLogs([ ...DEFAULT_WARNINGS.map(s => s.pattern), ...warnings.map(s => s.pattern) ]);
};
