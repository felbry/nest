const MONGOOSE = require('mongoose')
MONGOOSE.connect('mongodb://localhost:27017/nest', {
  useNewUrlParser: true
})
module.exports = MONGOOSE
