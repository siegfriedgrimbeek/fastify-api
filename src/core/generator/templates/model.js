// External Dependancies
const mongoose = require('mongoose')

module.exports = mongoose.model('Car', new mongoose.Schema({
  name: String
}))
