
const authRouter = require('express').Router()
const User = require('../models/user')
const { sign } = require('../utils/token')

authRouter.post('/', (request, response) => {
  const { username, password } = request.body

  User.findOne({ username }).then(user => {
    const passwordCorrect = user === null
      ? false
      : (password === user.password)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = sign(userForToken)

    response
      .status(200)
      .send({ token, username: user.username})
  })
})


module.exports = authRouter