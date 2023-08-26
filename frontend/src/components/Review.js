import { useDispatch, useSelector } from 'react-redux'
import { removeReview, reactToReview, commentReview } from '../reducers/reviews'
import { useParams, useNavigate } from 'react-router-dom'

import { useField } from '../hooks'

import { Button } from '.'

const Review = () => {
    const { id } = useParams()
    const review = useSelector((state) => state.reviews.find((u) => u.id === id))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const comment = useField('text')

    const user = useSelector((state) => state.user)

    if (!review) {
        return null
    }

    const own = user && review.user && user.username === review.user.username

    const addedBy =
        review.user && review.user.name ? review.user.name : 'anonymous'

    const onremoveReview = () => {
        const ok = window.confirm(`remove '${review.title}' by ${review.author}?`)

        if (!ok) {
            return
        }

        dispatch(removeReview(review.id))
        navigate('/')
    }

    const onLike = async () => {
        const liked = {
            ...review,
            likes: (review.likes || 0) + 1,
            user: review.user.id,
        }
        dispatch(reactToReview(liked, 'liked'))
    }

    const onAddComment = () => {
        console.log(comment.fields.value)
        dispatch(commentReview(review.id, comment.fields.value))
        comment.reset()
    }

    return (
        <div>
            <h2>
                {review.title} {review.author}
            </h2>
            <div>
                {review.reviewText}
            </div>
            <div>
                {review.likes} likes <Button onClick={onLike}>like</Button>
            </div>
            <div>added by {addedBy}</div>
            {own && <Button onClick={onremoveReview}>remove</Button>}

            <h3>comments</h3>

            <div>
                <input {...comment.fields} />{' '}
                <Button onClick={onAddComment}> add comment</Button>
            </div>

            <ul>
                {review.comments && review.comments.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
        </div>
    )
}

export default Review
