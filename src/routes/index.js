// Import routes
const bookRoutes = require('./book.routes')
const carRoutes = require('./car.routes')
const userRoutes = require('./user.routes')

module.exports = [
...bookRoutes,
...carRoutes,
...userRoutes
]
