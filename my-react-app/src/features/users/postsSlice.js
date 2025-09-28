import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk('posts/fetchPosts',
    async() => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        return response.json()
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
       data:[],
       status: 'idle',
       error:null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, state =>{
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state,action) => {
                state.status = 'successfull'
                state.data = action.payload
            })
            .addCase(fetchPosts.rejected, (state,action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default postsSlice.reducer