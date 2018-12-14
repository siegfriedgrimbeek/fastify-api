// Import Swagger documentation
// const documentation = require('./documentation/carApi')
const obj = require('../core/base/route')
let { controller, uri, routes } = obj.routeGenerate('car')

// new route here

module.exports = routes
