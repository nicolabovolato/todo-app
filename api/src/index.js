require('dotenv').config()

const fastify = require('fastify')({logger: true})

fastify.decorate('db',   require('./decorators/postgres'))
fastify.decorate('auth', require('./decorators/jwt'))

fastify.register(require('fastify-cors'),   {origin: '*'})
fastify.register(require('./routes/todos'), {prefix: 'todos'})
fastify.register(require('./routes/auth'),  {prefix: 'auth'})

fastify.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
