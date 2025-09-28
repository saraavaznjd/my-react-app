import React from "react";
import { useGetPostsQuery, useGetUsersQuery } from "./features/RTKServices/api";

function App() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const { data: users } = useGetUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.slice(0, 5).map((post) => (
          <li key={post.id}>
            <strong>
              {users?.find((u) => u.id === post.userId)?.name || "Unknown"}
            </strong>
            : {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
