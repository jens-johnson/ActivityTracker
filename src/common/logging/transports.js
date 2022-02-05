import chalk from 'chalk';

const colors = new chalk.Instance({ level: 3 });

/**
 * Custom mapping of log levels to Chalk colors and log functions
 */
const CONSOLE = {
  COLORS: {
    0: (data) => data,
    1: colors.bold.blue,
    2: colors.bold.yellow,
    3: colors.bold.red
  },
  STREAMS: {
    0: (data) => console.debug(data),
    1: (data) => console.info(data),
    2: (data) => console.warn(data),
    3: (data) => console.error(data)
  }
};

/**
 * JSON console transport. Colors output using Chalk and sends output to console streams
 *
 * @param {Object} props - Transport options
 * @param {Object} props.level - Information describing the logging level
 * @param {Object} props.rawMsg - The raw data to be logged
 * @param {Object} props.extension - The optional namespace extension for the logger
 */
function json({ level, rawMsg, extension }) {
  const color = CONSOLE.COLORS[level?.severity || 0];
  const log = CONSOLE.STREAMS[level?.severity || 0];
  log(color(`${new Date().toLocaleString()} | ${level?.text?.toUpperCase()} | ${extension}`));
  log(JSON.stringify(rawMsg, null, 2));
}

export default {
  console: {
    json
  }
};
