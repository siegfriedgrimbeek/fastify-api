// Import routes
const bookRoutes = require('./book.routes')
const carRoutes = require('./car.routes')

module.exports = [
...bookRoutes,
...carRoutes
]
