var logger = require('../..')()

logger.debug('debug')
logger.options.logLevel = 'debug'
logger.debug('debug')
logger.options.logLevel = 'error'
logger.debug('debug')