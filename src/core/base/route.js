module.exports = (model, isUncountable = false) => {

  // Import Controllers
  const handler = require(`../../controllers/${model}.controller`)

  // Import Swagger documentation
  const documentation = require(`../../routes/documentation/${model}.schema`)
  // Get Schema
  const schema = documentation[`${model}Schema`]

  // Define url
  const uri = isUncountable ? `${model}` : `${model}s`;

  return {
    handler: handler,
    schema: schema,
    uri: uri,
    routes: [
      {
        method: 'GET',
        url: `/api/${uri}`,
        handler: handler.index,
        schema: schema.index || null
      },
      {
        method: 'GET',
        url: `/api/${uri}/test`,
        handler: handler.test
      },
      {
        method: 'GET',
        url: `/api/${uri}/:id`,
        handler: handler.read,
        schema: schema.read || null
      },
      {
        method: 'POST',
        url: `/api/${uri}`,
        handler: handler.create,
        schema: schema.create || null
      },
      {
        method: 'PUT',
        url: `/api/${uri}/:id`,
        handler: handler.update,
        schema: schema.update || null
      },
      {
        method: 'DELETE',
        url: `/api/${uri}/:id`,
        handler: handler.delete,
        schema: schema.delete || null
      }
    ]
  }
}
