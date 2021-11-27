import { logger, configLoggerType } from 'react-native-logs';
import { JSONConsoleTransport } from './transports';

const loggingConfig = {
  transport: JSONConsoleTransport,
  transportOptions: {
    colors: 'ansi',
  },
};

const applicationLogger = logger.createLogger(loggingConfig);

/**
 * Returns a logger for a given namespace
 *
 * @param {string} namespace - The namespace for the logger
 * @return {*} - Extended logger
 */
export const getLogger = (namespace) => {
  applicationLogger.enable(namespace);
  return applicationLogger.extend(namespace);
};
