// External Dependancies
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_id: String
})

module.exports = mongoose.model('user', userSchema)