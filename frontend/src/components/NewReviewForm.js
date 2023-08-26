import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createReview } from '../reducers/reviews'

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
            <h2>Create new</h2>

            <form onSubmit={handleSubmit}>
                <div>
                title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                        id="title"
                        placeholder="title of the review"
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                        id="author"
                        placeholder="author of the review"
                    />
                </div>
                <div>
                    review
                    <input
                        value={reviewText}
                        onChange={({ target }) => setReviewText(target.value)}
                        id="reviewText"
                        placeholder="review text"
                    />
                </div>
                <button id="create-butto" type="submit">
                create
                </button>
            </form>
        </div>
    )
}

export default NewReviewForm
