exports.addTestResultsSchema = {
    description: 'Create a new test result',
    tags: ['testResults'],
    summary: 'Creates new question with given values',
    body: {
        type: 'object',
        properties: {
            theme_id: { type: 'number' },
            test_id: { type: 'number' },
            test: { type: 'string' },
            result: { type: 'number' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                theme_id: { type: 'number' },
                test_id: { type: 'number' },
                test: { type: 'string' },
                result: { type: 'number' },
                __v: { type: 'number' }
            }
        }
    }
}

exports.updateTestResultsSchema = {
    description: 'Update existing test result',
    tags: ['testResults'],
    summary: 'Update existing test result with given values',
    body: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            theme_id: { type: 'number' },
            test_id: { type: 'number' },
            test: { type: 'string' },
            result: { type: 'number' },
            answers: { type: 'object' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                theme_id: { type: 'number' },
                test_id: { type: 'number' },
                test: { type: 'string' },
                result: { type: 'number' },
                __v: { type: 'number' }
            }
        }
    }
}
