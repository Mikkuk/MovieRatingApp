import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'
import reviewReducer from './reducers/reviews'
import userReducer from './reducers/user'
import usersReducer from './reducers/users'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        reviews: reviewReducer,
        user: userReducer,
        users: usersReducer,
    },
})

export default store
