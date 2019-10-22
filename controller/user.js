const EXPRESS = require('express')
const ROUTER = EXPRESS.Router()
const JWT = require('jsonwebtoken')

var jwt = require('../middleware/auth')
const USER = require('../model/user')
const CONFIG = require('../config')

ROUTER.post('/login', (req, res) => {
  let {
    username,
    password
  } = req.body
  return USER
    .findOne({
      username,
      password
    })
    .then(userRet => {
      if (userRet) {
        return res.json({
          code: 0,
          data: {
            token: JWT.sign(
              {
                uid: userRet._id
              },
              CONFIG.secret
            )
          }
        })
      }
      res.json({
        code: 1,
        data: {
          msg: '用户不存在'
        }
      })
    })
})

ROUTER.get('/status', jwt, (req, res) => {
  // TODO: 后续校验user表是否存在id
  res.json({ code: 0 })
})

module.exports = ROUTER
