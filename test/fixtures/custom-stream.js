var outStream =
    { write: function () {
        process.stdout.write('custom stream got the log')
      }
    }
  , logger = require('../..')({ outStream: outStream })

logger.info('info')