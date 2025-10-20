// src/components/Profile.tsx
import React from "react";
import { useUserContext } from "../contexts/userContext.js";

export const Profile: React.FC = () => {
  const { selectedUser } = useUserContext();

  if (!selectedUser) return <p>No user selected</p>;

  return (
    <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 10 }}>
      <h3>Selected User</h3>
      <p><b>Name:</b> {selectedUser.name}</p>
      <p><b>Email:</b> {selectedUser.email}</p>
    </div>
  );
};
