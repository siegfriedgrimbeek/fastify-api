const testResultsController = require('../controllers/testResultsController')

const testResultsDocumentation = require('./documentation/testResultsApi')

const routes = [
    {
        method: 'GET',
        url: '/api/test/results/all',
        handler: testResultsController.getAllTestResults
    },
    {
        method: 'GET',
        url: '/api/test/results/:id',
        handler: testResultsController.getTestResultsById
    },
    {
        method: 'POST',
        url: '/api/test/results',
        handler: testResultsController.addTestResult,
        schema: testResultsDocumentation.addTestResultsSchema
    },
    {
        method: 'GET',
        url: '/api/test/results/:theme_id/:test_id/:user_id',
        handler: testResultsController.countUserTestResults
    },
    {
        method: 'GET',
        url: '/api/test/results/:theme_id/:user_id',
        handler: testResultsController.countUserTestResultsByTheme
    }
]

module.exports = routes
