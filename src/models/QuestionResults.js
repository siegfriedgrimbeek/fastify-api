// External Dependancies
const mongoose = require('mongoose'), Schema = mongoose.Schema

const questionResultsSchema = new mongoose.Schema({
    user_id: Number,
    theme_id: Number,
    test_id: Number,
    question: { type: Schema.Types.ObjectId, ref: 'question' },
    points: Number,
    difficulty: Number,
    user_answers: [String],
    right_answers: [Number],
    result: Number
})

module.exports = mongoose.model('questionResult', questionResultsSchema)