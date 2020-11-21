// External Dependancies
const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: String,
  qtype: String,
  difficulty: Number,
  right_answers: [Number],
  points: Number,
  subtheme: Number,
  answers: {
    type: Map,
    of: String
  }
})

module.exports = mongoose.model('question', questionSchema)
