import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [
            { id: 1, userId: 1, title: "Learning React" },
            { id: 2, userId: 1, title: "Hooks are awesome" },
            { id: 3, userId: 2, title: "Redux Deep Dive" }
        ],
        loading: false,
    },
    reducers: {}
})

export default postsSlice.reducer