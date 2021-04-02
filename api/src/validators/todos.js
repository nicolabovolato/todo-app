const todoValidator = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'description', 'completed'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        completed: { type: 'boolean' },
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          completed: { type: 'boolean' },
        }
      }
    }
  }
}

const todoArrayValidator = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' },
          }
        }
      }
    }
  }
}

module.exports = { todoValidator, todoArrayValidator }
