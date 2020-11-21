// External Dependancies
const mongoose = require('mongoose'), Schema = mongoose.Schema

const questionResultsSchema = new mongoose.Schema({
    user_id: Number,
    theme_id: Number,
    test_id: { type: Schema.Types.ObjectId, ref: 'question' },
    question: { type: Schema.Types.ObjectId, ref: 'question' },
    user_answers: [Number]
})

module.exports = mongoose.model('questionResult', questionResultsSchema)
