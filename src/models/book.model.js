// External Dependancies
const mongoose = require('mongoose')

module.exports = mongoose.model('Book', new mongoose.Schema({
  name: String,
  description: String
}))
