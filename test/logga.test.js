var assert = require('assert')
  , exec = require('child_process').exec

describe('logga()', function (done) {

  it('should use default options if none are passed', function (done) {
    exec('node ./test/fixtures/simple-logs', function (err, stdout, stderr) {
      assert(!err)
      assert(!/debug/.test(stdout))
      assert(/info/.test(stdout))
      assert(/error/.test(stdout))
      done()
    })
  })

  it('should allow colors to be switched off', function (done) {
    exec('node ./test/fixtures/no-colors', function (err, stdout, stderr) {
      assert(!err)
      assert(!/debug/.test(stdout))
      assert(/info/.test(stdout))
      assert.equal(stdout.indexOf('\u001b[32m'), -1)
      done()
    })
  })

  it('should allow a custom output stream', function (done) {
    exec('node ./test/fixtures/custom-stream', function (err, stdout, stderr) {
      assert(!err)
      assert.equal('custom stream got the log', stdout)
      done()
    })
  })

  it('should options to be changed after instantiation', function (done) {
    exec('node ./test/fixtures/modify-options', function (err, stdout, stderr) {
      assert(!err)
      assert.equal(stdout.match(/debug/g).length, 1)
      done()
    })
  })

  it('should prefix context', function (done) {

    var output = { write: function (data) {
      assert.ok(data.match(/\[test\] info/), data)
      done()
    }}
    var logger = require('..')({ context: 'test', colors: false, outStream: output })
    logger.info('info')
  })

  it('should prefix duplicate current logger with new context', function (done) {

    var output = { write: function (data) {
      assert.ok(data.match(/\[new\] info/), data)
      done()
    }}
    var logger = require('..')({ context: 'test', colors: false, outStream: output })
    var newLogger = logger.setContext('new')
    newLogger.info('info')

  })

  it('should show only time when asked', function (done) {

    var output = { write: function (data) {
      assert.equal(data.length, 14)
      done()
    }}
    var logger = require('..')({ timeOnly: true, colors: false, outStream: output })
    logger.info('info')

  })


  it('should correctly embed placeholders into message', function (done) {

    var output = { write: function (data) {
      assert.equal(data.substring(data.lastIndexOf('Z') + 2)
        , 'I am a placeholder so is this 999\n')
      done()
    }}
    var logger = require('..')({ colors: false, outStream: output })
    logger.info('I am a %s so is this %d', 'placeholder', 999)

  })

  it('should allow hostname to be switched on', function (done) {
    exec('node ./test/fixtures/hostname-on', function (err, stdout, stderr) {
      var os = require('os')
      assert(!err)
      assert(/info/.test(stdout), "info line is printed to stdout")
      assert.notEqual(stdout.indexOf(os.hostname(), -1, "hostname is included in output"))
      done()
    })
  })

  it('should allow log levels to be printed out', function (done) {
    exec('node ./test/fixtures/printlevel-on', function (err, stdout, stderr) {
      var os = require('os')
      assert(!err)
      assert(/INFO/.test(stdout), "info line is printed to stdout")
      assert(/ERROR/.test(stdout), "error line is printed to stdout")
      done()
    })
  })
})
