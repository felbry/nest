const MONGOOSE = require('../connection.js')

const ARTICAL_SCHEMA = new MONGOOSE.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: 'ObjectId',
    ref: 'Admin'
  },
  file: {
    type: 'ObjectId',
    ref: 'File'
  }
}, { timestamps: true })

module.exports = MONGOOSE.model('Artical', ARTICAL_SCHEMA)
