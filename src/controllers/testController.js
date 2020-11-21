const boom = require('boom')


const Test = require('../models/Test')

exports.getAllTests = async (req, reply) => {
    try {
        const tests = await Test.find({})
        return tests
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Get single test by ID
exports.getTestById = async (req, reply) => {
    try {
        const id = req.params.id
        const test = await Test.findById(id)
        return test
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Add a new test
exports.addTest = async (req, reply) => {
    try {
        const test = new Test(req.body)
        return test.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Update an existing test
exports.updateTest = async (req, reply) => {
    try {
        const id = req.params.id
        const test = req.body
        const { ...updateData } = test
        const update = await Test.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

// Delete a test
exports.deleteTest = async (req, reply) => {
    try {
        const id = req.params.id
        const test = await Test.findByIdAndRemove(id)
        return test
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getTestByIdAndTheme = async (req, reply) => {
    try {
        const _id = req.params.id
        const _theme_id = req.params.theme_id

        return Test.findOne({id: _id, theme_id: _theme_id})
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getTestsByTheme = async (req, reply) => {
    try {
        const _theme_id = req.params.theme_id

        return Test.find({theme_id: _theme_id})
    } catch (err) {
        throw boom.boomify(err)
    }
}