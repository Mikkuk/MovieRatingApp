import { useDispatch, useSelector } from 'react-redux'
import { removeReview, reactToReview, commentReview } from '../reducers/reviews'
import { useParams, useNavigate } from 'react-router-dom'

import { useField } from '../hooks'

import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

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
        dispatch(commentReview(review.id, comment.fields.value))
        comment.reset()
    }

    return (
        <div>
            <h2>
                {review.title} directed by {review.author}
            </h2>
            <div>
                {review.reviewText}
            </div>
            <div>
                {review.likes} people liked this review <Button variant="contained" color="primary" onClick={onLike}>like</Button>
            </div>
            <div>added by {addedBy}</div>
            {own && <Button sx={{ mt: '5px' }} variant="contained" color="primary" onClick={onremoveReview}>remove</Button>}

            <h3>comments</h3>

            <div>
                <TextField sx={{ mt: '5px' }} label="comment" {...comment.fields} />{' '}
                <br></br>
                <Button sx={{ mt: '5px' }} variant="contained" color="primary" onClick={onAddComment}> add comment</Button>
            </div>
            <TableContainer id="comment" component={Paper}>
                <Table>
                    <TableBody>
                        {review.comments && review.comments.map((comment, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {comment}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Review
