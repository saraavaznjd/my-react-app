import React from "react";
import {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./features/RTKServices/api";

export default function Posts() {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Posts</h1>
      <button
        onClick={() => createPost({ title: "New", body: "Content", userId: 1 })}
      >
        Add Post
      </button>

      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid gray", margin: "8px" }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button onClick={() => updatePost({ id: post.id, title: "Updated" })}>
            Update
          </button>
          <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
