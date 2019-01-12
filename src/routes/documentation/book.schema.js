// sampleSchema = {
//   description: 'Create a new YourModel',
//   tags: ['data'],
//   summary: 'Creates new car with given values',
//   body: {
//     type: 'object',
//     properties: {
//       title: { type: 'string' },
//       brand: { type: 'string' },
//       price: { type: 'string' },
//       age: { type: 'number' },
//       services: { type: 'object' }
//     }
//   },
//   response: {
//     200: {
//       description: 'Successful response',
//       type: 'object',
//       properties: {
//         _id: { type: 'string' },
//         title: { type: 'string' },
//         brand: { type: 'string' },
//         price: { type: 'string' },
//         age: { type: 'number' },
//         services: { type: 'object' },
//         __v: { type: 'number' }
//       }
//     }
//   }
// }

exports.bookSchema = {
  create: {
    description: 'Create a new YourModel',
    tags: ['data'],
    summary: 'Creates new car with given values',
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          __v: { type: 'number' }
        }
      }
    }
  }
}
