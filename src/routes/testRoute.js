const testController = require('../controllers/testController')

const testDocumentation = require('./documentation/testApi')

const routes = [
    {
        method: 'GET',
        url: '/api/test/all',
        handler: testController.getAllTests
    },
    {
        method: 'GET',
        url: '/api/test/:id',
        handler: testController.getTestById
    },
    {
        method: 'POST',
        url: '/api/test',
        handler: testController.addTest,
        schema: testDocumentation.addTestSchema
    },
    {
        method: 'PUT',
        url: '/api/test/:id',
        handler: testController.updateTest,
        schema: testDocumentation.updateTestSchema
    },
    {
        method: 'DELETE',
        url: '/api/test/:id',
        handler: testController.deleteTest
    },
    {
        method: 'GET',
        url: '/api/test/:id/:theme_id',
        handler: testController.getTestByIdAndTheme
    },
    {
        method: 'GET',
        url: '/api/test/:theme_id/all',
        handler: testController.getTestsByTheme,
        schema: testDocumentation.testSchema
    }
]

module.exports = routes
