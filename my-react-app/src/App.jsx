import React from "react";
import Posts from "./BlogByRTK/posts/posts";
import Users from "./BlogByRTK/users/users";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./BlogByRTK/auth/authSlice";

export default function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Blog Project</h1>

      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
          <Posts />
        </div>
      ) : (
        <div>
          <p>Please login:</p>
          <button onClick={() => dispatch(login("Sara"))}>Login as Sara</button>
        </div>
      )}

      <hr />
      <Users />
    </div>
  );
}
