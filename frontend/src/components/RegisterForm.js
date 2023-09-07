import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/users'
import { useField } from '../hooks'

import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const RegisterForm = () => {
    const usernameValue = useField('username')
    const nameValue = useField('name')
    const passwordValue = useField('password')

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        const username = usernameValue.fields.value
        const name = nameValue.fields.value
        const password = passwordValue.fields.value
        dispatch(createUser({ username, name, password }))
        console.log(username, name, password)
    }

    return (
        <div>
            <h2>Register new user</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField label="username" {...usernameValue.fields} />
                </div>
                <div>
                    <TextField label="name" {...nameValue.fields} />
                </div>
                <div>
                    <TextField label="password" {...passwordValue.fields} />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    register
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
