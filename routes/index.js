// Import our Controllers
const carController = require('../controllers/carController')

// Import Swagger documentation
const documentation = require('./documentation/carApi')

const routes = [
  {
    method: 'GET',
    url: '/api/cars',
    handler: carController.getCars
  },
  {
    method: 'GET',
    url: '/api/cars/car',
    handler: carController.getSingleCar
  },
  {
    method: 'POST',
    url: '/api/cars',
    handler: carController.addCar,
    schema: documentation.addCarSchema
  },
  {
    method: 'PUT',
    url: '/api/cars',
    handler: carController.updateCar
  },
  {
    method: 'DELETE',
    url: '/api/cars',
    handler: carController.deleteCar
  }
]

module.exports = routes
