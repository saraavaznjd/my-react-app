import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface User {
    username: string,
    role: "user" | "admin"
}

export interface AuthState {
    user: User | null
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null')
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string }>) => {
            //if username = admin => role = admin
            const isAdmin = action.payload.username === "admin";

            const user: User = {
                username: action.payload.username,
                role: isAdmin ? "admin" : "user",
            };

            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer