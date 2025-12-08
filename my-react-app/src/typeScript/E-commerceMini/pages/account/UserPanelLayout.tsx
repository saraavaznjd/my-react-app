import { NavLink, Outlet } from "react-router-dom";

export default function UserPanelLayout() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="max-w-5xl mx-auto mt-24 px-4">
      <h1 className="text-2xl font-bold mb-6">👤 Account Dashboard</h1>

      {/* Navigation */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        <NavLink to="orders" className={linkClass}>Orders</NavLink>
        <NavLink to="wishlist" className={linkClass}>Wishlist</NavLink>
        <NavLink to="settings" className={linkClass}>Settings</NavLink>
      </div>

      <Outlet />
    </div>
  );
}
