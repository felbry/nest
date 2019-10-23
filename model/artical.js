const MONGOOSE = require('../connection.js')

const ARTICAL_SCHEMA = new MONGOOSE.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: 'ObjectId',
    ref: 'User',
    required: true
  },
  file: {
    type: 'ObjectId',
    ref: 'File',
    required: true
  }
}, { timestamps: true })

module.exports = MONGOOSE.model('Artical', ARTICAL_SCHEMA)
