import type React from "react";
import { useFetch } from "../hooks/useFetch.js";
import { useUserContext } from "../contexts/userContext.js";

type User = {
    id: number;
    name: string;
    email: string;
}

export const UserDropdown: React.FC = () => {
    const {users:users, loading} = useFetch<User>("https://jsonplaceholder.typicode.com/users")
    const {setSelectedUser} = useUserContext()

    if(loading) return <p>Loading...</p>

    return(
        <select  onChange={(e) => {
        const user = users?.find((u) => u.id === Number(e.target.value));
        if (user) setSelectedUser(user);
      }}
        >
            <option value="">Select a user</option>
            {users?.map(user => 
                (<option key={user.id} value={user.id}>{user.name}</option>)
            )}
        </select>
    )
}