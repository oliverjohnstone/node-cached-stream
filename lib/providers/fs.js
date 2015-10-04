var fs = require('fs')
  , path = require('path')

module.exports = FileSystemCache

function FileSystemCache (options) {
  this.cachePath = options.tempPath || '/tmp'
}

FileSystemCache.prototype.getCachePath = function (key) {
  return path.normalize(this.cachePath + '/' + key)
}

FileSystemCache.prototype.isValid = function (key, timeout, cb) {
  var createdAfter = new Date()
  createdAfter.setTime(createdAfter.getTime() - timeout)

  fs.stat(this.getCachePath(key), function (err, stat) {
    if (err) return cb(err, false)
    return cb(null, stat.ctime > createdAfter)
  })
}

FileSystemCache.prototype.get = function (key) {
  return fs.createReadStream(this.getCachePath(key))
}

FileSystemCache.prototype.set = function (key) {
  return fs.createWriteStream(this.getCachePath(key))
}
