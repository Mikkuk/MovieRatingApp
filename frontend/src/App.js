import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, Link } from 'react-router-dom'

import Reviews from './components/Reviews'
import Review from './components/Review'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import NewReviewForm from './components/NewReviewForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import { Navigation, Page, NavButton, Footer } from './components'

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
        dispatch(setNotification({ message: 'good bye!', type: 'info' }))
    }

    if (user === null) {
        return (
            <Page>
                <Notification />
                <LoginForm />
                <RegisterForm />
            </Page>
        )
    }

    const padding = {
        padding: 5,
    }

    return (
        <Page>
            <Navigation>
                <Link style={padding} to="/">
                    Reviews
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
                <span style={{ paddingLeft: 5, paddingRight: 5 }}>
                    {user.name} logged in
                </span>
                <NavButton onClick={logout}>logout</NavButton>
            </Navigation>

            <Notification />

            <Togglable buttonLabel="create new Review" ref={ReviewFormRef}>
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

            <Footer>Movie rating app</Footer>
        </Page>
    )
}

export default App
