import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../features/counterSlice.js'

export const store = configureStore(
    {reducer:{
        counter: counterReducer
    }}
)

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch