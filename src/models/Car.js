// External Dependancies
const mongoose = require('mongoose')

module.exports = mongoose.model('Car', new mongoose.Schema({
  title: String,
  brand: String,
  price: String,
  age: Number,
  services: {
    type: Map,
    of: String
  }
}))
