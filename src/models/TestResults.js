// External Dependancies
const mongoose = require('mongoose'), Schema = mongoose.Schema

const testResultSchema = new mongoose.Schema({
    user_id: Number,
    theme_id: Number,
    test_id: Number,
    test: {type: Schema.Types.ObjectId, ref: 'test'},
    result: Number
})

module.exports = mongoose.model('testResult', testResultSchema)