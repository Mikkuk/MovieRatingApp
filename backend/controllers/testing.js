const testingRouter = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Review.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter
