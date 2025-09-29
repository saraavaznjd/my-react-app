import React from "react";
import { useGetUsersQuery } from "../services/api";

export default function Users() {
  const { data: users, isLoading } = useGetUsersQuery();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Users</h2>
      {users?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}
