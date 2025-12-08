import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../features/products/productsApi.js";
import cartReducer from '../features/cart/cartSlice.js'
import authReducer from '../features/auth/authSlice.js'
import ordersReducer from '../features/orders/ordersSlice.js'
import wishListReducer from '../features/wishList/wishListSlice.js'


export const store = configureStore({
    reducer: {
        [productsApi.reducerPath] : productsApi.reducer,
        cart : cartReducer,
        auth : authReducer,
        orders : ordersReducer,
        wishLists: wishListReducer,
    },
    middleware: (gdm) => gdm().concat(productsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch