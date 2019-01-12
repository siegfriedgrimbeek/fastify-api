module.exports = (model, isUncountable = false) => {

  // Import Controllers
  const handler = require(`../../controllers/${model}.controller`)

  // Import Swagger documentation
  const documentation = require(`../../routes/documentation/${model}.schema`)
  // Get Schema
  const schema = documentation[`${model}Schema`]

  // Define url
  const routeName = isUncountable ? `${model}` : `${model}s`;

  return {
    handler: handler,
    schema: schema,
    routeName: routeName,
    routes: [
      {
        method: 'GET',
        url: `/${routeName}`,
        handler: handler.index,
        schema: schema.index || null
      },
      {
        method: 'GET',
        url: `/${routeName}/test`,
        handler: handler.test
      },
      {
        method: 'GET',
        url: `/${routeName}/:id`,
        handler: handler.read,
        schema: schema.read || null
      },
      {
        method: 'POST',
        url: `/${routeName}`,
        handler: handler.create,
        schema: schema.create || null
      },
      {
        method: 'PUT',
        url: `/${routeName}/:id`,
        handler: handler.update,
        schema: schema.update || null
      },
      {
        method: 'DELETE',
        url: `/${routeName}/:id`,
        handler: handler.delete,
        schema: schema.delete || null
      }
    ]
  }
}
