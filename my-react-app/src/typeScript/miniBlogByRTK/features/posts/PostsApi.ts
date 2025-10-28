import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Post } from "../../types/type.js";
import type { RootState } from "../../app/store.js";


export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
        prepareHeaders: (headers,{getState}) => {
            const token = (getState() as RootState).auth.user?.token
            if(token) headers.set('Authorization', `Bearer ${token}`)
            return headers
        }
    }),
    tagTypes: ['posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[],void>({
            query: () => '/posts',
            providesTags: ['posts']
        }),
        addPost: builder.mutation<Post,Partial<Post>>({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost
            }),
            invalidatesTags: ['posts']
        })
    })
})

export const {useGetPostsQuery,useAddPostMutation} = postsApi