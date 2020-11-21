// External Dependancies
const boom = require('boom')

// Get Data Models
const Question = require('../models/Question')

// Get all questions
exports.getAllQuestions = async (req, reply) => {
  try {
    return await Question.find({})
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single question by ID
exports.getQuestionById = async (req, reply) => {
  try {
    const id = req.params.id
    const question = await Question.findById(id)
    return question
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new question
exports.addQuestion = async (req, reply) => {
  try {
    const question = new Question(req.body)
    return question.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing question
exports.updateQuestion = async (req, reply) => {
  try {
    const id = req.params.id
    const question = req.body
    const { ...updateData } = question
    const update = await Question.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a question
exports.deleteQuestion = async (req, reply) => {
  try {
    const id = req.params.id
    const question = await Question.findByIdAndRemove(id)
    return question
  } catch (err) {
    throw boom.boomify(err)
  }
}
