// // External Dependancies
// const boom = require('boom')

// // Get Data Models
// const Car = require('../models/Car')

const obj = require('../core/controllers/basedController')
exports['car'] = obj.controllerGenerate('Car')
