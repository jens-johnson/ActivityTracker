import { logger, consoleTransport } from 'react-native-logs';

const loggingConfig = {
  transport: consoleTransport,
  transportOptions: {
    colors: 'ansi',
  },
};
const applicationLogger = logger.createLogger(loggingConfig);

/**
 * Returns a logger for a given namespace
 *
 * @param {string} namespace - The namespace for the logger
 * @return {*}
 */
export const getLogger = (namespace) => {
  applicationLogger.enable(namespace);
  return applicationLogger.extend(namespace);
};

