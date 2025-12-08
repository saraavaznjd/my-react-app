import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface cartItem {
    id: number,
    title: string,
    price: number,
    image: string,
    quantity: number
}

export interface cartState {
    items: cartItem[],
    totalQuantity: number;
    totalPrice: number;
}

const savedItems = localStorage.getItem('cart')
const initialState: cartState = {
    items: savedItems ? JSON.parse(savedItems) : [],
    totalQuantity: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<cartItem>) => {
            const existing = state.items.find(item => item.id === action.payload.id)
            if (existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }

            localStorage.setItem('cart', JSON.stringify(state.items))
            state.totalQuantity++;
            state.totalPrice += action.payload.price;
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const existing = state.items.find((i) => i.id === id);

            if (existing) {
                state.items = state.items.filter((i) => i.id !== id);
                localStorage.setItem("cart", JSON.stringify(state.items));
                state.totalQuantity -= existing.quantity;
                state.totalPrice -= existing.price * existing.quantity;
            }
        },

        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (!item) return;
            if (item.quantity > 1) item.quantity -= 1;
            else state.items = state.items.filter((i) => i.id !== action.payload);

            localStorage.setItem("cart", JSON.stringify(state.items));
            state.totalQuantity--;
            state.totalPrice -= item.price;
        },

        emptyCart: (state,action : PayloadAction<void>) => {
            state.items = []
            state.totalPrice = 0
            state.totalQuantity = 0
            localStorage.removeItem('cart')
        }
    }
})

export const { addToCart, removeFromCart, decreaseQuantity, emptyCart } = cartSlice.actions
export default cartSlice.reducer