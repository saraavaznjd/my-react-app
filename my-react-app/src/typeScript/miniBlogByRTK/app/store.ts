import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi.js";
import { postsApi } from "../features/posts/PostsApi.js";
import authReducer from '../features/auth/authSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath] : authApi.reducer,
        [postsApi.reducerPath] : postsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(postsApi.middleware)
})

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch