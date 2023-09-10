import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createReview } from '../reducers/reviews'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const NewReviewForm = ({ togglableRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [reviewText, setReviewText] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        togglableRef.current.toggleVisibility()
        dispatch(createReview({ title, author, reviewText, likes: 0 }))
        setAuthor('')
        setTitle('')
        setReviewText('')
    }

    return (
        <div>
            <h2>Create new Review</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        sx={{ mt: '5px' }}
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        id="title"
                        placeholder="title of the movie"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ mt: '5px' }}
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        id="author"
                        placeholder="director of the movie"
                    />
                </div>
                <div>
                    <TextField
                        sx={{ mt: '5px' }}
                        value={reviewText}
                        onChange={({ target }) => setReviewText(target.value)}
                        id="reviewText"
                        placeholder="review text"
                    />
                </div>
                <Button sx={{ mt: '5px' }} variant="contained" color="primary" type="submit">
                create
                </Button>
            </form>
        </div>
    )
}

export default NewReviewForm
