const CRYPTO = require('crypto')
const STREAM = require('stream')
module.exports = function (buffer) {
  return new Promise((resolve, reject) => {
    let md5 = CRYPTO.createHash('md5')
    let stream = new STREAM.PassThrough()
    stream.end(buffer)
    stream.on('data', function (chunk) {
      md5.update(chunk)
    })
    stream.on('end', function () {
      resolve(md5.digest('hex'))
    })
  })
}
