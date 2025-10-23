import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CounterState = {
    value: number
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementbyAmount: (state, action:PayloadAction<number>) => {
            state.value += action.payload
        }
    },
})

export const {increment,decrement,incrementbyAmount} = counterSlice.actions
export default counterSlice.reducer