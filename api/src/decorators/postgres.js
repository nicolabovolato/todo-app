const pg = require('pg')

//TODO Parse env

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

const userOwnsTodo = async (id, username) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('SELECT * FROM todos where id = $1 and user_id = $2;', [id, username])
        await client.end()

        return result.rows.length > 0
    }
    catch(err) {
        console.error(err)
        return false
    }

}

const getAll = async () => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('SELECT * FROM todos;')
        await client.end()

        return result.rows
    }
    catch(err) {
        console.error(err)
    }
}

const getByUsername = async (username) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('SELECT * FROM todos where user_id = $1;', [username])
        await client.end()

        return result.rows
    }
    catch(err) {
        console.error(err)
    }
}


const getById = async (id) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('SELECT * FROM todos WHERE id = $1;', [id])
        await client.end()

        return result.rowCount > 0 ? result.rows[0] : null
    }
    catch(err) {
        console.error(err)
    }
}

const getUserByUsername = async (username) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('SELECT * FROM users WHERE username = $1;', [username])
        await client.end()

        return result.rowCount > 0 ? result.rows[0] : null
    }
    catch(err) {
        console.error(err)
    }
}

const create = async (todo, username) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING *;', [todo.title, todo.description, username])
        await client.end()

        return result.rows[0]
    }
    catch(err) {
        console.error(err)
    }
}

const createUser = async (user) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        await client.query('INSERT INTO users (username, password) VALUES ($1, $2);', [user.username, user.password])
        await client.end()

        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}

const update = async (todo) => {

    try {
        const client = new pg.Client(options)
        await client.connect()
        const result = await client.query('UPDATE todos SET description = $2, completed = $3 WHERE id = $1 RETURNING *;', [todo.id, todo.description, todo.completed])
        await client.end()

        return result.rows[0]
    }
    catch(err) {
        console.error(err)
    }
}

const _delete = async (id) => {
    try {
        const client = await new pg.Client(options)
        await client.connect()
        const result = await client.query('DELETE FROM todos WHERE id = $1;', [id])
        await client.end()

        return true
    }
    catch(err) {
        console.error(err)
        return false
    }
}

module.exports = {
    todos: {
        getAll,
        getByUsername,
        getById,
        create,
        update,
        delete: _delete,
        userOwnsTodo,
    },
    users: {
        getByUsername: getUserByUsername,
        create: createUser,
    }
}
