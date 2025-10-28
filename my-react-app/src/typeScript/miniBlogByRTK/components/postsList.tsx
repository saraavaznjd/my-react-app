import { useAppSelector } from "../app/hooks.js"
import { useGetPostsQuery } from "../features/posts/PostsApi.js"
import Login from "./login.js"


export default function PostsList(){
    const {user} = useAppSelector(state => state.auth)
    const {data:Posts,isLoading} = useGetPostsQuery(undefined,
       { skip: !user}
    )

    if(!user){
        return(
            <>
                <p>Please Login to see Posts</p>
                <Login/>
            </>
        )
    }
    if(isLoading) return <p>Loading...</p>

    return(
        <ul>
            {Posts?.map(post => (
                <li key={post.id}>{post.title}</li>
            ))}
        </ul>
    )
}