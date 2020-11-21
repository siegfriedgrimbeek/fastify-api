const boom = require('boom')

const TestResults = require('../models/TestResults')

exports.getAllTestResults = async (req, reply) => {
    try {
        const tests = await TestResults.find({})
        return tests
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single testResults by ID
exports.getTestResultsById = async (req, reply) => {
    try {
        const id = req.params.id
        const testResults = await TestResults.findById(id)
        return testResults
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new testResults
exports.addTestResult = async (req, reply) => {
    try {
        const testResults = new TestResults(req.body)
        return testResults.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.countUserTestResults = async (req, reply) => {
    try {
        const _user_id = req.params.user_id
        const _test_id = req.params.test_id
        const _theme_id = req.params.theme_id

        return TestResults.find({user_id: _user_id, test_id: _test_id, theme_id: _theme_id}).toArray().map(x => x.result).reduce((partial_sum, a) => partial_sum + a,0)
    } catch (err) {
        throw boom.boomify(err)
    }
}