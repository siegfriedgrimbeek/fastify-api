// Import our Controllers
const questionController = require('../controllers/questionController')

// Import Swagger documentation
const questionDocumentation = require('./documentation/questionApi')

const routes = [
  {
    method: 'GET',
    url: '/api/question/all',
    handler: questionController.getAllQuestions
  },
  {
    method: 'GET',
    url: '/api/question/:id',
    handler: questionController.getQuestionById
  },
  {
    method: 'POST',
    url: '/api/question',
    handler: questionController.addQuestion,
    schema: questionDocumentation.addQuestionSchema
  },
  {
    method: 'PUT',
    url: '/api/question/:id',
    handler: questionController.updateQuestion,
    schema: questionDocumentation.updateQuestionSchema
  },
  {
    method: 'DELETE',
    url: '/api/question/:id',
    handler: questionController.deleteQuestion
  }
]

module.exports = routes
