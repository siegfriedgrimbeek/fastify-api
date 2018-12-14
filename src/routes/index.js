// Import our Controllers
const carController = require('../controllers/carController')

// Import Swagger documentation
// const documentation = require('./documentation/carApi')

const routes = [
  {
    method: 'GET',
    url: '/api/cars',
    handler: carController['car'].list
  },
  {
    method: 'GET',
    url: '/api/cars/:id',
    handler: carController['car'].detail
  },
  {
    method: 'POST',
    url: '/api/cars',
    handler: carController['car'].new,
    // schema: documentation.addCarSchema
  },
  {
    method: 'PUT',
    url: '/api/cars/:id',
    handler: carController['car'].update
  },
  {
    method: 'DELETE',
    url: '/api/cars/:id',
    handler: carController['car'].delete
  }
]

module.exports = routes
