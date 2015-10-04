var assert = require('assert')
  , createCachedStream = require('../cached-stream')

describe('cachedStream', function () {
  it('should export a function that returns a function', function () {
    assert.equal(typeof createCachedStream, 'function', 'should export a function')
    assert.equal(typeof createCachedStream(), 'function', 'should return a function')
  })
})
