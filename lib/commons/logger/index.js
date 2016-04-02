var ROOT_PATH = process.cwd();

var winston = require('winston');
var pkg = require(ROOT_PATH + '/package.json');

var formatter = function formatter(options) {
  var message = (undefined !== options.message ? options.message : '');

  var template = options.timestamp.toISOString() + ' - ' +
    '[' + options.level.toUpperCase() + '] - ' + message;

  return winston.config.colorize(options.level, template);
};

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: 'debug',
      timestamp: new Date(),
      formatter: formatter
    }),
    new winston.transports.File({
      filename: 'log/' + pkg.name + '.log',
      maxsize: '10000000'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'log/' + pkg.name + '_exceptions.log',
      maxsize: '10000000'
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function write(message) {
    logger.info(message);
  }
};

module.exports = logger;
