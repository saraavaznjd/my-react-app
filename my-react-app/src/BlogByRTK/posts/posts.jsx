import React from "react";
import {
    useGetPostsQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} from "../services/api";

export default function Posts() {
    const { data: posts, isLoading } = useGetPostsQuery();
    const [createPost] = useAddPostMutation();
    const [updatePost] = useUpdatePostMutation();
    const [deletePost] = useDeletePostMutation();

    if (isLoading) return <p>Loading posts...</p>;

    return (
        <div>
            <h2>Posts</h2>
            <button
                onClick={() =>
                    createPost({ title: "New Post", body: "Some content", userId: 1 })
                }
            >
                Add Post
            </button>
            {posts?.map((post) => (
                <div key={post.id} style={{ border: "1px solid gray", margin: "8px" }}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button
                        onClick={() =>
                            updatePost({ id: post.id, title: "Updated", body: post.body })
                        }
                    >
                        Update
                    </button>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
