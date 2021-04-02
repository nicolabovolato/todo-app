module.exports = async (fastify, options) => {

    const crypto = require('crypto')
    const service = fastify.db.users
    const auth = fastify.auth

    const {loginValidator, refreshValidator} = require.main.require('./validators/auth.js')

    fastify.post('/login', loginValidator, async (req, res) => {

        const user = await service.getByUsername(req.body.username)
        if(!user) return res.status(401).send()

        const hash = crypto.createHash('sha512').update(req.body.password).digest('hex')
        if(hash != user.password) return res.status(401).send()

        return await auth.authenticate(user.username)
    })

    fastify.post('/signup', {schema: {body: loginValidator.schema.body}}, async (req, res) => {

        const user = await service.getByUsername(req.body.username)
        if(user) return res.status(409).send()

        const hash = crypto.createHash('sha512').update(req.body.password).digest('hex')
        const created = await service.create({username: req.body.username, password: hash})
        if(!created) return res.status(500).send()

        return res.status(201).send()
    })

    fastify.post('/refresh', refreshValidator, async (req, res) => {

        const refreshed = await auth.refresh(req.headers.authorization)
        if(!refreshed) return res.status(400).send()

        return refreshed
    })
}
