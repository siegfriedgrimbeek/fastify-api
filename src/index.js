// Require the module alias
require('module-alias/register')

// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: {
    prettyPrint: true,
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          path: req.path,
          parameters: req.parameters,
          body: req.body,
          headers: req.headers,
        };
      }
    }
  }
})

// Require external modules
const mongoose = require('mongoose')

// Import Routes
const routes = require('./routes/app.route')

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Connect to DB
mongoose.connect('mongodb://localhost/mycargarage')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Loop over each route
routes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
