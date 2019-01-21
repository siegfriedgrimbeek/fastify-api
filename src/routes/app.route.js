// Import routes
const bookRoute = require('./book.route')
const { productRoute } = require('./product.route')

module.exports = [
	...bookRoute, //book
	...productRoute
]
