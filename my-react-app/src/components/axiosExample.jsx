import { useState,useEffect } from "react";
import axios from "axios"

export default function AxiosExample(){
    const [posts,setPosts] = useState([])
    const [loader,setLoader] = useState(true)
    const [error,setError] = useState(null)

    const getPosts = () => {
        setLoader(true)
        setError(null)

       axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => {
            console.log(res.data);
            
            setPosts(res.data.splice(0,5))
            setLoader(false)
        })
        .catch(err => {
            setError(err.massage)
            setLoader(false)
        })
    }
    //fetching posts for the first time
    useEffect(() => {
    getPosts();
  }, []);

  return(
    <div style={{textAlign:'center', marginTop:'2rem'}}>
        <h2>Posts List</h2>
        <button onClick={getPosts} style={{marginBottom:'1rem'}}> 🔄 Reload Posts</button>

        {loader && <p>Loading Users...</p>}
        {error && <p style={{color:'red'}}>Error: {error}</p>}
        {!loader && !error && (
            <ul style={{listStyle:'none', padding:'0'}}>
                {posts.map(post => (
                    <li key={post.id}>
                        <div style={{border:'1px solid gray', padding:'1rem', width:'50%', margin:'0 auto', marginBottom:'1rem'}}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                        </div>
                    </li>
                ))}
            </ul>
        )
        }
    </div>
  )
}