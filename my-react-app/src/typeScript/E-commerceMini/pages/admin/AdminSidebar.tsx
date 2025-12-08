// src/admin/AdminSidebar.tsx
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

export default function AdminSidebar() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg cursor-pointer transition 
     ${isActive ? "bg-black text-white shadow" : "text-gray-700 hover:bg-gray-200"}`;

  return (
    <div className="fixed top-0 left-0 w-60 h-full bg-white border-r shadow-sm pt-20 px-4">
      <h2 className="text-xl font-bold mb-8 px-2">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" end className={linkClasses}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClasses}>
          <Package size={20} /> Products
        </NavLink>

        <NavLink to="/admin/orders" className={linkClasses}>
          <ShoppingCart size={20} /> Orders
        </NavLink>

        <NavLink to="/admin/reports" className={linkClasses}>
          <Users size={20} /> Reports
        </NavLink>
      </nav>
    </div>
  );
}
