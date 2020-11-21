const questionResultsController = require('../controllers/questionResultsController')

const questionResultsDocumentation = require('./documentation/questionResultsApi')

const routes = [
    {
        method: 'GET',
        url: '/api/question/results/all',
        handler: questionResultsController.getAllQuestionResults
    },
    {
        method: 'GET',
        url: '/api/question/results/:id',
        handler: questionResultsController.getQuestionResultsById
    },
    {
        method: 'POST',
        url: '/api/question/results',
        handler: questionResultsController.addQuestionResults,
        schema: questionResultsDocumentation.addQuestionResultsSchema
    },
    {
        method: 'PUT',
        url: '/api/question/results/:id',
        handler: questionResultsController.updateQuestionResults,
        schema: questionResultsDocumentation.updateQuestionResultsSchema
    },
    {
        method: 'DELETE',
        url: '/api/question/results/:id',
        handler: questionResultsController.deleteQuestionResults
    }
]

module.exports = routes
