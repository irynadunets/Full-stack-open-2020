var winston = require('winston')

var options = {
  file: {
    level: 'info',
    filename: `${__dirname}/./logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  }
}

const timezoned = () => new Date().toLocaleString('en-US', { timeZone: 'Europe/Kiev' })

// instantiate a new Winston Logger with the settings defined above
var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  format:
    winston.format.combine(winston.format.simple(),
      winston.format.timestamp({
        format: timezoned,
      }),
      winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)),
  exitOnError: false, // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  },
}

module.exports = logger
