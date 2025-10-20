import React, {useEffect, useState} from 'react'

export function useFetch<T>(url: string){
    const [users,setUsers] = useState<T[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(
        () => {
            fetch(url)
            .then(res => res.json())
            .then(data => setUsers(data))
            .finally(()=>setLoading(false))
        },[url]
    )
    return {users,loading}
}