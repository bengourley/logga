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


})