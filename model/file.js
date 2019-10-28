const MONGOOSE = require('../connection.js')

const FILE_SCHEMA = new MONGOOSE.Schema({
  mimetype: String,
  size: Number,
  encoding: String,
  originalName: String,
  publicPath: String,
  md5: String
}, { timestamps: true })

module.exports = MONGOOSE.model('File', FILE_SCHEMA)
