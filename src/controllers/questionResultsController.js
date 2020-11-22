const boom = require('boom')

const QuestionResults = require('../models/QuestionResults')

// Get all questionResults
exports.getAllQuestionResults = async (req, reply) => {
    try {
        const questionResults = await QuestionResults.find({})
        return questionResults
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single questionResult by ID
exports.getQuestionResultsById = async (req, reply) => {
    try {
        const id = req.params.id
        const questionResult = await QuestionResults.findById(id)
        return questionResult
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new questionResult
exports.addQuestionResults = async (req, reply) => {
    try {
        const { user_id, theme_id, test_id, question, user_answers } = req.body

        let existQuestion = await QuestionResults.findOne({theme_id, user_id, test_id, _id: question})

        let currentQuestionResult;
        if (existQuestion == null) {
            const questionResult = new QuestionResults(req.body)
            currentQuestionResult = await questionResult.save()
        } else {
            currentQuestionResult = await QuestionResults.findByIdAndUpdate(existQuestion._id, {user_answers}, { new: true })
        }

        console.log(currentQuestionResult)



    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing questionResult
exports.updateQuestionResults = async (req, reply) => {
    try {
        const id = req.params.id
        const questionResult = req.body
        const { ...updateData } = questionResult
        const update = await QuestionResults.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a questionResult
exports.deleteQuestionResults = async (req, reply) => {
    try {
        const id = req.params.id
        const questionResult = await QuestionResults.findByIdAndRemove(id)
        return questionResult
    } catch (err) {
        throw boom.boomify(err)
    }
}
