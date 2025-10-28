import type React from "react";
import { useLoginMutation } from "../features/auth/authApi.js";
import { setUser } from "../features/auth/authSlice.js";
import { useAppDispatch } from "../app/hooks.js";


export default function Login(){
    const [login] = useLoginMutation()
    const dispatch = useAppDispatch()

    const handleLogin = async() => {
        try {
            const user = await login({email :'sara',password:'1234'}).unwrap()
            dispatch(setUser(user))
        } catch (error:any) {
            console.error(error)
        }
    }

    return(
        <button onClick={handleLogin}>Login</button>
    )
}