import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import type { AppDispatch } from "../app/store.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username.trim()) return;
    dispatch(login({username}));
    navigate(-1)
  };

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-full max-w-sm p-6 border rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="text"
          placeholder="Enter username..."
          className="border p-2 w-full rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
