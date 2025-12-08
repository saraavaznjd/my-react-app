// src/admin/AdminDashboard.tsx
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold">📊 Dashboard Overview</h1>

      <p className="text-gray-600 mt-2">
        Welcome to your shop's admin panel! 🎉
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-gray-500">Manage all products</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold">Orders</h2>
          <p className="text-gray-500">Track store orders</p>
        </div>

        <div className="bg-white p-6 shadow rounded-xl">
          <h2 className="text-lg font-semibold">Reports</h2>
          <p className="text-gray-500">View all reports</p>
        </div>
      </div>
    </div>
  );
}
