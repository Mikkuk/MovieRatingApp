import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import userService from '../services/user'
import { loginUser } from '../reducers/user'
import { useField } from '../hooks'

import { setNotification } from '../reducers/notification'

import { TextField } from '@mui/material'
import { Button } from '@mui/material'

const LoginForm = () => {
    const username = useField('text')
    const password = useField('password')

    const dispatch = useDispatch()

    const notify = (message, type = 'info') => {
        dispatch(setNotification({ message, type }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loginService
            .login({
                username: username.fields.value,
                password: password.fields.value,
            })
            .then((user) => {
                userService.setUser(user)

                dispatch(loginUser(user))
                notify(`${user.name} logged in!`, 'success')
            })
            .catch(() => {
                notify('wrong username/password', 'error')
            })
    }

    return (
        <div>
            <h2>Log in to application</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <TextField  sx={{ mt: '5px' }} label="username" {...username.fields} />
                </div>
                <div>
                    <TextField sx={{ mt: '5px' }} label="password" {...password.fields} />
                </div>
                <Button sx={{ mt: '5px' }} variant="contained" color="primary" type="submit">
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
