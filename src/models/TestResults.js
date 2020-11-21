// External Dependancies
const mongoose = require('mongoose'), Schema = mongoose.Schema

const testResultSchema = new mongoose.Schema({
    user_id: Number,
    theme_id: Number,
    test_id: {type: Schema.Types.ObjectId, ref: 'test'},
    points: Number,
    lessons: [Number]
})

module.exports = mongoose.model('testResult', testResultSchema)
