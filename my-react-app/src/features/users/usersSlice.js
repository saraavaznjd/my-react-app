import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [
            { id: 1, name: "Sara" },
            { id: 2, name: "Maniyar" }
        ],
        loading: false,
    },
    reducers:{}
})

export default usersSlice.reducer