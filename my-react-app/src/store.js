import {configureStore} from '@reduxjs/toolkit' 
import counterReducer from './features/counter/counterSlice'
import usersReducer from './features/users/usersSlice'
import postsReducer from './features/users/postsSlice'

export const store = configureStore({
    reducer: {
        counter : counterReducer,
        users : usersReducer,
        posts: postsReducer,
    },
})