const router = require('express').Router()
const { request, response } = require('../app')
const Review = require('../models/review')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/', async (request, response) => {
  const reviews = await Review.find({}).populate('user', { username: 1, name: 1 })

  response.json(reviews)
})

router.post('/', async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user
  const review = new Review({ ...request.body, user: user.id })

  const savedReview = await review.save()
  user.reviews = user.reviews.concat(savedReview._id)
  await user.save()

  const reviewToReturn = await Review.findById(savedReview._id).populate('user', {
    username: 1,
    name: 1,
  })

  response.status(201).json(reviewToReturn)
})

router.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  console.log(comment, request.body)
  const review = await Review.findById(request.params.id)

  review.comments = review.comments.concat(comment)
  await review.save()

  response.json(review)
})

router.delete('/:id', async (request, response) => {
  const reviewToDelete = await Review.findById(request.params.id)
  if (!reviewToDelete) {
    return response.status(204).end()
  }

  if (reviewToDelete.user && reviewToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: 'only creator can delete the blog',
    })
  }

  await Review.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

router.put('/:id', (request, response, next) => {
  const body = request.body

  const review = {
    title: body.title,
    author: body.author,
    reviewText: body.reviewText,
    likes: body.likes,
  }

  Review.findByIdAndUpdate(request.params.id, review, { new: true })
    .then((updatedReview) => {
      response.json(updatedReview)
    })
    .catch((error) => next(error))
})

module.exports = router
