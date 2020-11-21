exports.addQuestionResultsSchema = {
    description: 'Create a new question result',
    tags: ['questionResults'],
    summary: 'Creates new question result with given values',
    body: {
        type: 'object',
        properties: {
            user_id: { type: 'number' },
            theme_id: { type: 'number' },
            test_id: { type: 'number' },
            question: { type: 'string' },
            user_answers: { type: 'array' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
            }
        }
    }
}

exports.updateQuestionResultsSchema = {
    description: 'Update existing question results',
    tags: ['questionResults'],
    summary: 'Update existing question with given values',
    body: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            user_id: { type: 'number' },
            theme_id: { type: 'number' },
            test_id: { type: 'number' },
            question: { type: 'string' },
            points: { type: 'number' },
            difficulty: { type: 'number' },
            user_answers: { type: 'object' },
            right_answers: { type: 'object' },
            result: { type: 'number' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: { type: 'string' },
                user_id: { type: 'number' },
                theme_id: { type: 'number' },
                test_id: { type: 'number' },
                question: { type: 'string' },
                points: { type: 'number' },
                difficulty: { type: 'number' },
                user_answers: { type: 'object' },
                right_answers: { type: 'object' },
                result: { type: 'number' },
                __v: { type: 'number' }
            }
        }
    }
}
