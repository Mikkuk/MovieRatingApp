import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material'

const User = () => {
    const { id } = useParams()

    const user = useSelector((state) => state.users.find((u) => u.id === id))

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>Reviews by {user.name}</h2>
            <TableContainer id="user" component={Paper}>
                <Table>
                    <TableBody>
                        {user.reviews.map((b) => (
                            <TableRow key={b.id}>
                                <TableCell>
                                    {b.title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default User
