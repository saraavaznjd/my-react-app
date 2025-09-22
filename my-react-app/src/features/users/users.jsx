import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectStatus, selectUsersWithOrgEmail } from "./usersSlice";

export default function UsersList() {

    const dispatch = useDispatch()
    const users = useSelector(selectUsersWithOrgEmail)
    const status = useSelector(selectStatus)
    const error = useSelector(state => state.users.error)

    useEffect(
        () => {
            dispatch(fetchUsers())            
        },[dispatch])

    if (status === 'loading') return <p>Loading ...</p>
    if (status === 'failed') return <p>error : {error}</p>

    return (
        <div className="p-6 border rounded shadow space-y-2">
            <h2 className="text-xl font-bold">Users List</h2>
            {users.map((user) => (
                <div key={user.id} className="border-b py-1">
                    {user.name} ({user.email})
                </div>
            ))}
        </div>
    )
}