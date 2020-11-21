exports.addQuestionSchema = {
  description: 'Create a new question',
  tags: ['questions'],
  summary: 'Creates new question with given values',
  body: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      qtype: { type: 'string' },
      difficulty: { type: 'number' },
      right_answers: { type: 'array' },
      points: { type: 'number' },
      subtheme: { type: 'number' },
      answers: { type: 'object' }
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

exports.updateQuestionSchema = {
  description: 'Update existing question',
  tags: ['questions'],
  summary: 'Update existing question with given values',
  body: {
    type: 'object',
    properties: {
      text: { type: 'string' },
      qtype: { type: 'string' },
      difficulty: { type: 'number' },
      right_answers: { type: 'number' },
      points: { type: 'number' },
      subtheme: { type: 'number' },
      answers: { type: 'object' }
    }
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        _id: { type: 'string' },
        text: { type: 'string' },
        qtype: { type: 'string' },
        difficulty: { type: 'number' },
        right_answers: { type: 'number' },
        points: { type: 'number' },
        subtheme: { type: 'number' },
        answers: { type: 'object' },
        __v: { type: 'number' }
      }
    }
  }
}
