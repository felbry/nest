const MONGOOSE = require('../connection.js')

const USER_SCHEMA = new MONGOOSE.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  }
})

module.exports = MONGOOSE.model('User', USER_SCHEMA)
