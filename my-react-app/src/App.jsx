import React from "react";
import { useSelector } from "react-redux";
import {
  selectUserCount,
  selectPostsByUser,
  selectUsersWithPostCount
} from './features/users/selectors';

export default function App() {
  const userCount = useSelector(selectUserCount);
  const saraPosts = useSelector(selectPostsByUser(1)); // فقط پست‌های سارا
  const usersWithPosts = useSelector(selectUsersWithPostCount);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Users & Posts Dashboard</h1>
      <p>Total Users: {userCount}</p>

      <h2>Sara's Posts:</h2>
      <ul>
        {saraPosts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <h2>Users with Post Count:</h2>
      <ul>
        {usersWithPosts.map((u) => (
          <li key={u.id}>
            {u.name} — {u.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
}
