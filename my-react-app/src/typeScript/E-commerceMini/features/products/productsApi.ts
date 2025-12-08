import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../types/types.js";


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl:'https://fakestoreapi.com'}),
    tagTypes: ['products'],
    endpoints: builder => ({
        getProducts: builder.query<Product[],void>({
            query: () => '/products',
            providesTags: ['products']            
        }),
        getProductById: builder.query<Product,number>({
            query: id => `products/${id}`
        }),
        getCategories: builder.query<string[],void>({
            query: () => '/products/categories'
        })
    })
})

export const {useGetProductsQuery,useGetProductByIdQuery,useGetCategoriesQuery} = productsApi