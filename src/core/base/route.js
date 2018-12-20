module.exports = (model) => {
  // Import our Controllers
  const controller = require(`../../controllers/${model}.controller`)
  // Define url
  const uri = `${model}s`;
  return {
    controller: controller,
    uri: uri,
    routes: [
      {
        method: 'GET',
        url: `/api/${uri}`,
        handler: controller.index
      },
      {
        method: 'GET',
        url: `/api/${uri}/test`,
        handler: controller.test
      },
      {
        method: 'GET',
        url: `/api/${uri}/:id`,
        handler: controller.detail
      },
      {
        method: 'POST',
        url: `/api/${uri}`,
        handler: controller.new,
        // schema: documentation.addCarSchema
      },
      {
        method: 'PUT',
        url: `/api/${uri}/:id`,
        handler: controller.update
      },
      {
        method: 'DELETE',
        url: `/api/${uri}/:id`,
        handler: controller.delete
      }
    ]
  }
}
