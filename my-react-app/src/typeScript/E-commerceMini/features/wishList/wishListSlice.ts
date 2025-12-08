import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


export interface WishListItem {
    id: number,
    title: string,
    price: number,
    image: string
}

export interface WishListState {
    items: WishListItem[]
}

const initialState: WishListState = {
    items: JSON.parse(localStorage.getItem('wishlists') || '[]')
}

export const wishListsSlice = createSlice({
    name: 'wishLists',
    initialState,
    reducers: ({
        toggleWishlist: (state, action: PayloadAction<WishListItem>) => {
            const product = action.payload;
            const exists = state.items.find((p) => p.id === product.id);

            if (exists) {
                state.items = state.items.filter((p) => p.id !== product.id);
            } else {
                state.items.push(product);
            }

            localStorage.setItem("wishlist", JSON.stringify(state.items));
        },
    })
})

export const {toggleWishlist} = wishListsSlice.actions
export default wishListsSlice.reducer