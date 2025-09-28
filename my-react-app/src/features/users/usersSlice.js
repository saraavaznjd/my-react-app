import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetchUsers',
    async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        return response.json()
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
       data:[],
       status: 'idle',
       error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state =>{
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state,action) => {
                state.status = 'successfull'
                state.data = action.payload
            })
            .addCase(fetchUsers.rejected, (state,action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default usersSlice.reducer