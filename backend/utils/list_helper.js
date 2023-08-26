var _ = require('lodash')

const dummy = (reviews) => {
    return 1
  }

const totalLikes = (reviews) => {

    let totalLikes = 0
    reviews.forEach(review => {
        totalLikes += review.likes
    })

    return reviews.length === 0
    ? 0
    : totalLikes
}

const favoriteReview = (reviews) => {

    let favoriteReview = reviews[0]
    reviews.forEach(review => {
        if (review.likes > favoriteReview.likes){
            favoriteReview = review
        }
    })

    const resultReview = {
        title: favoriteReview.title,
        author: favoriteReview.author,
        likes: favoriteReview.likes
    }
    return resultReview 
}

const mostReviews = (reviews) => {
    let mostReviews = _.filter(reviews, { author: reviews[0].author })
    reviews.forEach(review => {
        let i = _.filter(reviews, { author: review.author })
        if (i.length > mostReviews.length){
            mostReviews = i
        }
    })

    const resultReview = {
        author: mostReviews[0].author,
        reviews: mostReviews.length
    }
    return resultReview 
}

const mostLikes = (reviews) => {
    let mostLikes = 0
    let author

    reviews.forEach(review => {
        let authorReviews = _.filter(reviews, { author: review.author })
        let authorLikes = 0
        authorReviews.forEach(authorreview => {
            authorLikes += authorreview.likes
        })
        if (authorLikes > mostLikes){
            mostLikes = authorLikes
            author = review.author
        }
    })

    const resultAuthor = {
        author: author,
        likes: mostLikes
    }
    return resultAuthor 
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteReview,
    mostReviews,
    mostLikes
  }