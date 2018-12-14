// // External Dependancies
// const boom = require('boom')

// // Get Data Models
// const Car = require('../models/Car')

const obj = require('../core/base/controller')
let { boom, model, actions } = obj.controllerGenerate('Car')

//additional actions here

module.exports = actions
