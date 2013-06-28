# logga.js

A really simple, slightly configurable logger. The log levels are fixed, and based
on those of [node-bunyan](https://github.com/trentm/node-bunyan).

You can configure:
- level of output
- output stream
- colors (Sorry fellow brits, it's the American spelling for consistency)

Everything else is fixed, including output format.

## Install

```
npm install logga
```

## Usage

```js

var logger = require('logga')()

logger.trace('Very granular info')
logger.debug('A verbose message to be logged')
logger.info('Some useful info', 'can take', 'multiple', 'args')
logger.warn('Careful now, Mr. Fancy Programmer!')
logger.error('Something terrible happened, abort!', error)
logger.fatal('The apocalypse is upon us')

// The default log level is 'info', so the 'trace' and 'debug'
// statements would not log anything in this example.

```

## Options

- `logLevel` – can be one of the following: 'trace', 'debug', 'info', 'warn', 'error' or 'fatal'. Default: `'info'`.
- `colors` – whether the log output is in color. Default: `true`.
- `outStream` - the output stream to write to (or an object with a `write()` method). Default: `process.stdout`.
- `printLevel` - If true, includes the log level in the message, in uppercase. Default: `false`.
- `hostname` - If true, includes the hostname in the message. Default: `false`.

Options can be passed upon creation, or set on the fly at an point, eg.:

```js
var createLogger = require('logga')
  , logger = createLogger({ colors: false, logLevel: 'warn' })

logger.info('Hello!') // Will not output because log level is set to 'warn'

logger.options.logLevel = 'debug'

logger.info('World!') // Will now output because log level is now set to 'debug'
```
