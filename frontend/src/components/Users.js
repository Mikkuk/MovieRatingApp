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

const Users = () => {
    const users = useSelector((state) => state.users)

    return (
        <div>
            <h2>Users</h2>
            <TableContainer id="users" component={Paper}>
                <Table>
                    <TableBody>
                        <TableCell>
                            Username
                        </TableCell>
                        <TableCell>
                            Number of reviews
                        </TableCell>
                    </TableBody>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.username}>
                                <TableCell>
                                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                                </TableCell>
                                <TableCell>
                                    {u.reviews.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users
