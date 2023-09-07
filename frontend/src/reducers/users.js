import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import { setNotification } from './notification'

const slice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        initializeWith(state, { payload }) {
            return payload
        },
        addNew(state, { payload }) {
            return state.concat(payload)
        },
    },
})

export const initializeUsers = () => {
    return async (dispatch) => {
        usersService.getAll().then((response) => {
            dispatch(initializeWith(response))
        })
    }
}

export const createUser = (user) => {
    return async (dispatch) => {
        console.log(user, 'in reducer')
        usersService
            .create(user)
            .then((response) => {
                dispatch(addNew(response))
                dispatch(
                    setNotification({
                        message: `a new user '${user.username}' added`,
                        type: 'success',
                    })
                )
            })
            .catch((error) => {
                console.log(error)
                dispatch(
                    setNotification({
                        message:
                            'Registering user failed: ' +
                            error.response.data.error,
                        type: 'error',
                    })
                )
            })
    }
}

const { initializeWith, addNew } = slice.actions
export default slice.reducer
