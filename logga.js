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
    }

function logger(options) {


  if (!options) options = {}
  options.__proto__ = defaults

  var log = { options: options }

  function writeLog(level) {
    var args = Array.prototype.slice.call(arguments, 1)
    // Short circuit if this log is lower than the current log level
    if (levels[level].rank < levels[log.options.logLevel].rank) return
    if (log.options.colors) {
      args.unshift((new Date()).toISOString()[levels[level].color])
    } else {
      args.unshift((new Date()).toISOString())
    }
    log.options.outStream.write(util.format.apply(null, args) + '\n')
  }

  // Create a function for each log level
  Object.keys(levels).forEach(function (level) {
    try {
      log[level] = writeLog.bind(null, level)
    } catch (e) {
      throw new Error('Unsupported log level `' + log.options.logLevel + '`')
    }
  })
  return log
}