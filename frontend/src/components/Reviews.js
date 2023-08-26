import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

const Reviews = () => {
    const reviews = useSelector((state) => state.reviews)

    return (
        <div>
            <h2>reviews</h2>
            <div id="reviews">
                {reviews.map((review) => (
                    <div key={review.id}>
                        <Link to={`/reviews/${review.id}`}>
                            {review.title} by {review.author}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews
