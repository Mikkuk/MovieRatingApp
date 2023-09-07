import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

const Reviews = () => {
    const reviews = useSelector((state) => state.reviews)
    return (
        <div>
            <h2>reviews</h2>
            <TableContainer id="reviews" component={Paper}>
                <Table>
                    <TableBody>
                        {reviews.map((review) => (
                            <TableRow key={review.id}>
                                <TableCell>
                                    <Link to={`/reviews/${review.id}`}>
                                        {review.title} by {review.author}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Reviews
