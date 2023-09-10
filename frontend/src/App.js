import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, Link } from 'react-router-dom'


import {
    Container,
    AppBar,
    Toolbar,
    Button
} from '@mui/material'

import Reviews from './components/Reviews'
import Review from './components/Review'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewReviewForm from './components/NewReviewForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import userService from './services/user'

import { setNotification } from './reducers/notification'
import { initializeReviews } from './reducers/reviews'
import { initializeUsers } from './reducers/users'
import { logoutUser, loginUser } from './reducers/user'

const App = () => {
    const ReviewFormRef = useRef()

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(initializeReviews())
        dispatch(initializeUsers())
    }, [])

    useEffect(() => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) {
            dispatch(loginUser(userFromStorage))
        }
    }, [])

    const logout = () => {
        userService.clearUser()
        dispatch(logoutUser())
        dispatch(setNotification({ message: 'good bye!', type: 'success' }))
    }

    if (user === null) {
        return (
            <Container>
                <Notification />
                <LoginForm />
                <RegisterForm />
            </Container>
        )
    }


    return (
        <Container>
            <AppBar sx={{ mt: '2px' }} position="static">
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Reviews
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        users
                    </Button>
                    <span style={{ paddingLeft: 5, paddingRight: 5 }}>
                        {user.name} logged in
                    </span>
                    <Button  color="inherit" component={Link} onClick={logout}>logout</Button>
                </Toolbar>
            </AppBar>

            <Notification />

            <Togglable  buttonLabel="create new Review" ref={ReviewFormRef}>
                <NewReviewForm togglableRef={ReviewFormRef} />
            </Togglable>

            <Routes>
                <Route path="/" element={<Reviews />} />
            </Routes>
            <Routes>
                <Route path="/reviews/:id" element={<Review />} />
            </Routes>
            <Routes>
                <Route path="/users" element={<Users />} />
            </Routes>
            <Routes>
                <Route path="/users/:id" element={<User />} />
            </Routes>
            <div>
                <br />
                <em>Movie rating app</em>
            </div>
        </Container>
    )
}

export default App
