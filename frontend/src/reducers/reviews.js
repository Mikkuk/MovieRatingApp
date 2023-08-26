import { createSlice } from '@reduxjs/toolkit'
import reviewService from '../services/reviews'
import { setNotification } from './notification'

const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)

const slice = createSlice({
    name: 'review',
    initialState: [],
    reducers: {
        initializeWith(state, { payload }) {
            return payload.sort(byLikes)
        },
        addNew(state, { payload }) {
            return state.concat(payload).sort(byLikes)
        },
        removeOne(state, { payload }) {
            return state.filter((b) => b.id !== payload).sort(byLikes)
        },
        update(state, { payload }) {
            return state
                .map((b) => (b.id === payload.id ? payload : b))
                .sort(byLikes)
        },
    },
})

export const initializeReviews = () => {
    return async (dispatch) => {
        reviewService.getAll().then((response) => {
            dispatch(initializeWith(response))
        })
    }
}

export const removeReview = (id) => {
    return async (dispatch) => {
        reviewService.removeReview(id).then(() => {
            dispatch(removeOne(id))
        })
    }
}

export const reactToReview = (review, what) => {
    return async (dispatch) => {
        reviewService.update(review.id, review).then((updatedReview) => {
            dispatch(update(updatedReview))
            dispatch(
                setNotification({
                    message: `you ${what} '${review.title}' by ${review.author}`,
                    type: 'info',
                })
            )
        })
    }
}

export const commentReview = (id, comment) => {
    return async dispatch => {
        const data = await reviewService.comment(id, comment)
        dispatch(update(data))
    }
}

export const createReview = (review) => {
    return async (dispatch) => {
        reviewService
            .create(review)
            .then((response) => {
                dispatch(addNew(response))
                dispatch(
                    setNotification({
                        message: `a new review '${review.title}' by ${review.author} added`,
                        type: 'info',
                    })
                )
            })
            .catch((error) => {
                dispatch(
                    setNotification({
                        message:
                            'creating a review failed: ' +
                            error.response.data.error,
                        type: 'alert',
                    })
                )
            })
    }
}

const { initializeWith, addNew, removeOne, update } = slice.actions
export default slice.reducer
