import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store.js";
import { login, logout } from "../../features/auth/authSlice.js";
import {toast} from "react-hot-toast";

export default function Settings() {
  const user = useSelector((state: RootState) => state.auth.user);
  
  const [username, setUsername] = useState(user?.username || "");
  const dispatch = useDispatch();

  const handleSave = () => {
    if (!username.trim()) {
      toast.error("Username cannot be empty!");
      return;
    }

    dispatch(login({ username }));   // update user
    toast.success("Profile updated!");
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    dispatch(logout());
    toast.success("Account deleted!");
    location.href = "/";
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="text-xl font-semibold">Settings ⚙️</h2>

      {/* Username */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Username</label>
        <input
          className="border p-2 w-full rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Save Changes
      </button>

      {/* Delete account */}
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
}
