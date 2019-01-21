module.exports = (controller, isUncountable = false, dir = '') => {

  // Import Controllers
  const handler = require(`@controllers/${dir}${controller}.controller`)

  // Import Swagger documentation
  const documentation = require(`@routes/documentation/${dir}${controller}.schema`)
  // Get Schema
  const schema = documentation[`${controller}Schema`]

  // Define url
  const route = isUncountable ? `${dir}${controller}` : `${dir}${controller}s`;

  return {
    handler: handler,
    schema: schema,
    route: route,
    routes: [
      {
        method: 'GET',
        url: `/${route}`,
        handler: handler.index,
        schema: schema.index || null
      },
      {
        method: 'GET',
        url: `/${route}/test`,
        handler: handler.test
      },
      {
        method: 'GET',
        url: `/${route}/:id`,
        handler: handler.read,
        schema: schema.read || null
      },
      {
        method: 'POST',
        url: `/${route}`,
        handler: handler.create,
        schema: schema.create || null
      },
      {
        method: 'PUT',
        url: `/${route}/:id`,
        handler: handler.update,
        schema: schema.update || null
      },
      {
        method: 'DELETE',
        url: `/${route}/:id`,
        handler: handler.delete,
        schema: schema.delete || null
      }
    ]
  }
}
