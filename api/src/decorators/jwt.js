const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const access_token_expire  = '5m'
const refresh_token_expire = '7d'

const records = {}

const authenticate = async(username) => {

    try{
        const refresh_token = jwt.sign({username, type: 'refresh'}, secret, {expiresIn: refresh_token_expire})
        const access_token  = jwt.sign({username, type: 'access'} , secret, {expiresIn: access_token_expire })

        if(!Array.isArray(records[username])) records[username] = []

        records[username].push(refresh_token)

        return {refresh_token, access_token}
    }
    catch(err){
        console.error(err)
    }

}

const refresh = async(authHeader) => {

    try{
        const refresh_token = authHeader.split(' ')[1]
        const decoded = jwt.verify(refresh_token, secret)

        if(!Array.isArray(records[decoded.username]) || !records[decoded.username].includes(refresh_token)) throw 'Refresh token not found'

        const access_token = jwt.sign({username: decoded.username, type: 'access'}, secret, {expiresIn: access_token_expire})

        return {access_token}

    }
    catch(err){
        console.error(err)
    }
}

const authorize = async(authHeader) => {

    try{
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, secret)

        if(decoded.type != 'access') throw 'Invalid token type'

        return decoded.username

    }
    catch(err){
        console.error(err)
    }
}

module.exports = {authenticate, refresh, authorize}
