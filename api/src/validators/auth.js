const loginValidator = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        username: { type: 'string' },
        password: { type: 'string' }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          access_token: { type: 'string' },
          refresh_token: { type: 'string' }
        }
      }
    }
  }
}

const refreshValidator = {
  schema: {
    headers: {
      type: 'object',
      required: ['authorization'],
      properties: {
        authorization: { type: 'string' }
      }
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          access_token: { type: 'string' }
        }
      }
    }
  }
}

module.exports = { loginValidator, refreshValidator }
