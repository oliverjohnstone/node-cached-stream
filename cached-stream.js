var Stream = require('stream')
  , createGetCachedStream = require('./lib/get-cached-stream')

module.exports = createCachedStream

function createCachedStream (cacheProvider) {
  var getCachedStream = createGetCachedStream(cacheProvider)

  return function (key, timeout, stream) {
    var passThroughStream = new Stream.PassThrough()

    getCachedStream(key, timeout, function (err, valid, cachedStream) {
      if (err) return passThroughStream.emit('error', err)

      passThroughStream.emit('cache', valid ? 'HIT' : 'MISS')

      if (valid) {
        cachedStream.pipe(passThroughStream)
      } else {
        stream.pipe(cachedStream)
        stream.pipe(passThroughStream)
      }
    })

    return passThroughStream
  }
}
