// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

// Require external modules
const mongoose = require('mongoose')

// Import Routes
const questionRoutes = require('./routes/questionRoute')
const questionResultsRoutes = require('./routes/questionResultsRoute')
const testRoutes = require('./routes/testRoute')
const testResultsRoutes = require('./routes/testResultsRoute')

// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Register CORS
fastify.register(require('fastify-cors'))

// Connect to DB
mongoose.connect("mongodb+srv://BCSAdmin:YA35kUEzURnayYf@cluster0.mrofz.mongodb.net/scat", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err))

// Loop over each route
questionRoutes.forEach((route, index) => {
  fastify.route(route)
})

questionResultsRoutes.forEach((route, index) => {
  fastify.route(route)
})

testRoutes.forEach((route, index) => {
  fastify.route(route)
})

testResultsRoutes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
