// src/admin/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.js";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="pt-20 md:ml-60 p-8">
        <Outlet />
      </main>
    </div>
  );
}
