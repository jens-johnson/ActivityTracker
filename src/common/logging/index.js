import { logger as reactLogging } from 'react-native-logs';

import transports from './transports';

import { ENVIRONMENT } from '@env';

// Default logging config; uses environment-based configurations to send log streams
const config = {
  transport: { 'development': transports.console.json }[ ENVIRONMENT ] || transports.console.json
};

// Root logger; all application loggers are extended from this
const root = reactLogging.createLogger(config);

/**
 * Returns a logger for a given namespace
 *
 * @param {string} namespace - The namespace for the logger
 * @return {*} - An instance of the logger with the given namespace
 */
function getLogger(namespace) {
  const logger = root.extend(namespace);
  root.enable(namespace);
  return logger;
}

export default {
  getLogger
};
