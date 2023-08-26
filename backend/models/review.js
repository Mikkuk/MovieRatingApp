const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  reviewText: {
    type: String,
    required: true,
  },
  likes: Number,
  comments: [ String ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

reviewSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Review', reviewSchema)
