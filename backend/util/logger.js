/* eslint-disable indent */
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf, colorize } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] [${level}] ${message}`;
});

const consoleLogConfig = CONFIG.logConfig.consoleLogConfig;
const logger = createLogger({
  format: combine(
    label({ label: CONFIG.applicationName }),
    timestamp(),
    colorize(),
    customFormat
  ),
  transports: [new transports.Console(consoleLogConfig)]
});

module.exports = logger;
