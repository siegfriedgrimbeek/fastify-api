// External Dependancies
const mongoose = require('mongoose'), Schema = mongoose.Schema

const testSchema = new mongoose.Schema({
    theme_id: Number,
    easy_questions: [{type: Schema.Types.ObjectId, ref: 'question'}],
    medium_questions: [{type: Schema.Types.ObjectId, ref: 'question'}],
    difficult_questions: [{type: Schema.Types.ObjectId, ref: 'question'}]
})

module.exports = mongoose.model('test', testSchema)
