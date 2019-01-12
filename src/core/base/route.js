module.exports = (model, isUncountable = false) => {
  // Import our Controllers
  const controller = require(`../../controllers/${model}.controller`)
  const documentation = require(`../../routes/documentation/${model}.schema`)
  // Define url
  const uri = isUncountable ? `${model}` : `${model}s`;
  const schema = documentation[`${model}Schema`]
  return {
    controller: controller,
    uri: uri,
    routes: [
      {
        method: 'GET',
        url: `/api/${uri}`,
        handler: controller.index,
        schema: schema.index || null
      },
      {
        method: 'GET',
        url: `/api/${uri}/test`,
        handler: controller.test
      },
      {
        method: 'GET',
        url: `/api/${uri}/:id`,
        handler: controller.read,
        schema: schema.read || null
      },
      {
        method: 'POST',
        url: `/api/${uri}`,
        handler: controller.create,
        schema: schema.create || null
      },
      {
        method: 'PUT',
        url: `/api/${uri}/:id`,
        handler: controller.update,
        schema: schema.update || null
      },
      {
        method: 'DELETE',
        url: `/api/${uri}/:id`,
        handler: controller.delete,
        schema: schema.delete || null
      }
    ]
  }
}
