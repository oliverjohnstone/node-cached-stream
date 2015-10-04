module.exports = createGetCachedStream

function createGetCachedStream (cacheProvider) {
  return function getCachedStream (key, timeout, cb) {
    cacheProvider.isValid(key, timeout, function (err, valid) {
      if (err) return cb(err)

      if (valid) {
        cb(null, true, cacheProvider.get(key))
      } else {
        cb(null, false, cacheProvider.set(key))
      }
    })
  }
}
