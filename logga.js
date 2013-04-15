module.exports = logger

require('colors')

var util = require('util')
  , levels =
    { 'trace': { rank: 1, color: 'white' }
    , 'debug': { rank: 1, color: 'cyan' }
    , 'info': { rank: 2, color: 'green' }
    , 'warn': { rank: 3, color: 'yellow' }
    , 'error': { rank: 4, color: 'red' }
    , 'fatal': { rank: 4, color: 'inverse' }
    }
  , defaults =
    { logLevel: 'info'
    , outStream: process.stdout
    , colors: true
    , context: ''
    , timeOnly: false
    }

function logger(options) {

  if (!options) options = {}
  options.__proto__ = defaults

  var log = { options: options }

  function writeLog(level) {
    var args = Array.prototype.slice.call(arguments, 1)
      // format the message here because it made contain placeholders
      , message = util.format.apply(null, args)
      , output = [message]

    // Short circuit if this log is lower than the current log level
    if (levels[level].rank < levels[log.options.logLevel].rank) return

    if (options.context) {
      output.unshift('[' + options.context + ']')
    }
    var timeStamp = options.timeOnly ?
      (new Date()).toLocaleTimeString() : (new Date()).toISOString()

    if (log.options.colors) {
      output.unshift(timeStamp[levels[level].color])
    } else {
      output.unshift(timeStamp)
    }

    log.options.outStream.write(util.format.apply(null, output) + '\n')
  }

  // Create a function for each log level
  Object.keys(levels).forEach(function (level) {
    try {
      log[level] = writeLog.bind(null, level)
    } catch (e) {
      throw new Error('Unsupported log level `' + log.options.logLevel + '`')
    }
  })

  log.setContext = function(context) {
    var newOptions = {}
    Object.keys(options).forEach(function (key) {
      newOptions[key] = options[key]
    })
    newOptions.context = context
    return logger(newOptions)
  }

  return log
}