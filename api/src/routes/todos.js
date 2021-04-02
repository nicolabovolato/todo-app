module.exports = async (fastify, options) => {

    const service = fastify.db.todos
    const auth    = fastify.auth
    const {todoValidator, todoArrayValidator} = require.main.require('./validators/todos.js')

    fastify.decorateRequest('username', '')
    fastify.addHook('preValidation', async (req, res) => {
        const username = await auth.authorize(req.headers.authorization)

        if(!username) return res.status(401).send()

        req.username = username
    })

    fastify.get('/', {schema: {response: todoArrayValidator.schema.response}}, async (req, res) => {

        return await service.getByUsername(req.username)
    })

    fastify.get('/:id', {schema: {response: todoValidator.schema.response}}, async (req, res) => {

        const owned = await service.userOwnsTodo(req.params.id, req.username)
        if(!owned)  return res.status(403).send()

        const result = await service.getById(req.params.id)
        if(!result) return res.status(404).send()

        return result
    })

    fastify.post('/', todoValidator, async (req, res) => {

        const created = await service.create(req.body, req.username)
        if(!created) return res.status(500).send()

        return res.status(201).send(created)
    })

    fastify.put('/:id', todoValidator, async (req, res) => {

        const owned = await service.userOwnsTodo(req.params.id, req.username)
        if(!owned) return res.status(403).send()

        const found = await service.getById(req.params.id) != null
        if(!found) return res.status(404).send()

        const updated = await service.update({id: req.params.id, ...req.body})
        if(!updated) return res.status(500).send()

        return res.status(200).send(updated)
    })

    fastify.delete('/:id', async (req, res) => {

        const owned = await service.userOwnsTodo(req.params.id, req.username)
        if(!owned) return res.status(403).send()

        const found = await service.getById(req.params.id) != null
        if(!found) return res.status(404).send()

        const success = await service.delete(req.params.id)
        if(!success) return res.status(500).send()

        return res.status(204).send()

    })
}
