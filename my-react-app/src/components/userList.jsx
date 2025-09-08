import { useState,useEffect } from "react";

export default function UserList(){
    const [users,setUsers] = useState([])
    const [loader,setLoader] = useState(true)
    const [error,setError] = useState(null)

    const fetchDataUsers = async() => {
        try{
            setLoader(true)
            setError(null)

            const res = await fetch(`https://jsonplaceholder.typicode.com/users`)

            if(!res.ok){
                throw new Error('Faild to fetch users!')
            }

            const data = await res.json()

                setUsers(data)
                console.log(data);
                
        }catch(err){
                setError(err.massage)
        }finally{
            setLoader(false)
        }
    }
    //fetching users for the first time
    useEffect(() => {
    fetchDataUsers();
  }, []);

  return(
    <div style={{textAlign:'center', marginTop:'2rem'}}>
        <h2>Users List</h2>
        <button onClick={fetchDataUsers} style={{marginBottom:'1rem'}}> 🔄 Reload Users</button>

        {loader && <p>Loading Users...</p>}
        {error && <p style={{color:'red'}}>Error: {error}</p>}
        {!loader && !error && users &&(
            <ul style={{listStyle:'none', padding:'0'}}>
                {users.map(user => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>
                    </li>
                ))}
            </ul>
        )
        }
    </div>
  )
}