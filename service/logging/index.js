import { logger } from 'react-native-logs';

const applicationLogger = logger.createLogger();

/**
 * Returns a logger for a given namespace
 *
 * @param {string} namespace - The namespace for the logger
 * @return {*}
 */
const getLogger = (namespace) => applicationLogger.extend(namespace);

export {
  getLogger
}
