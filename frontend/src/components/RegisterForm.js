import { useDispatch } from 'react-redux'
import { createUser } from '../reducers/users'
import { useField } from '../hooks'

import { setNotification } from '../reducers/notification'

import { Button, Input } from '.'

const RegisterForm = () => {
    const usernameValue = useField('username')
    const nameValue = useField('name')
    const passwordValue = useField('password')

    const dispatch = useDispatch()

    const notify = (message, type = 'info') => {
        dispatch(setNotification({ message, type }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const username = usernameValue.fields.value
        const name = nameValue.fields.value
        const password = passwordValue.fields.value
        dispatch(createUser({ username, name, password }))
        console.log(username, name, password);
    }

    return (
        <div>
            <h2>Register new user</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <Input {...usernameValue.fields} />
                </div>
                <div>
                    name
                    <Input {...nameValue.fields} />
                </div>
                <div>
                    password
                    <Input {...passwordValue.fields} />
                </div>
                <Button id="register-button" type="submit">
                    register
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
