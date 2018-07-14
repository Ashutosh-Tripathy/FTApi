
var winston = require('winston');
var moment = require('moment');

const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'info';
const logTime = () => moment().utcOffset('+05:30').format('YYYY-MM-DD HH:mm:ss.SSS');

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', timestamp: logTime, colorize: true }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
export default logger;
