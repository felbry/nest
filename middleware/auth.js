const JWT = require('jsonwebtoken')
var config = require('../config')

module.exports = function (req, res, next) {
  let token = req.headers.authorization.split(' ')[1] || ''
  JWT.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ code: 1, data: { msg: err } })
    }
    req.user = decoded
    next()
  })
}
