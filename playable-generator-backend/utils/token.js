const jwt = require('jsonwebtoken')
const config = require('./config')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const sign = userForToken => {
    return jwt.sign(userForToken, config.SECRET)
}

const verify = token => {
    return jwt.verify(token, config.SECRET)
}

module.exports = { getTokenFrom, sign, verify }