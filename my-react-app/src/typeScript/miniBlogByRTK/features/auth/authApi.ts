import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../types/type.js";
import type { RootState } from "../../app/store.js";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://reqres.in/api',
        prepareHeaders : (headers, {getState}) => {
            const token = (getState() as RootState).auth.user?.token
            if(token){
                headers.set('Authorization' , `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation<User,{email:string,password:string}>({
            query: (credential) => ({
                url: '/login',
                method: "POST",
                body: credential
            })
        })
    })
})

export const {useLoginMutation} = authApi