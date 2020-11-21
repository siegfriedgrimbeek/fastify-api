exports.addTestSchema = {
    description: 'Create a new test',
    tags: ['tests'],
    summary: 'Creates new test with given values',
    body: {
        type: 'object',
        properties: {
            theme_id: {type: 'number'},
            easy_questions: { type: 'array' },
            medium_questions: { type: 'array' },
            difficult_questions: { type: 'array' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: {type: 'string'},
                theme_id: {type: 'number'},
                easy_questions: { type: 'array' },
                medium_questions: { type: 'array' },
                difficult_questions: { type: 'array' },
                __v: {type: 'number'}
            }
        }
    }
}

exports.updateTestSchema = {
    description: 'Update existing test',
    tags: ['tests'],
    summary: 'Update existing test with given values',
    body: {
        type: 'object',
        properties: {
            theme_id: {type: 'number'},
            easy_questions: { type: 'object' },
            medium_questions: { type: 'object' },
            difficult_questions: { type: 'object' },
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                _id: {type: 'string'},
                theme_id: {type: 'number'},
                easy_questions: { type: 'object' },
                medium_questions: { type: 'object' },
                difficult_questions: { type: 'object' },
                __v: {type: 'number'}
            }
        }
    }
}

exports.testSchema = {
    description: 'Get test',
    tags: ['tests'],
    summary: 'Get tests',
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            properties: {
                _id: {type: 'string'},
                theme_id: {type: 'number'},
                easy_questions: { type: 'array' },
                medium_questions: { type: 'array' },
                difficult_questions: { type: 'array' },
                __v: {type: 'number'}
            }
        }
    }
}
