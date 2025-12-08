import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store.js";
import  {updateOrder}  from "../../../features/orders/ordersSlice.js";
import   {deleteOrder}  from "../../../features/orders/ordersSlice.js";
import type { Order,OrderStatus } from "../../../features/orders/ordersSlice.js";

export default function AdminOrders() {
  const orders = useSelector((s: RootState) => s.orders.orders);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = orders;
    if (filter !== "all") list = list.filter(o => o.status === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(o => o.orderId.includes(q) || (o.userId || "").toLowerCase().includes(q));
    }
    return list;
  }, [orders, filter, query]);

  const statuses: OrderStatus[] = ["pending", "paid", "shipped", "delivered", "canceled"];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>

        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="all">All</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <input placeholder="Search by id or user" value={query} onChange={e => setQuery(e.target.value)} className="border p-2 rounded" />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((o: Order) => (
          <div key={o.orderId} className="p-4 border rounded-lg bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="text-sm text-gray-500">#{o.orderId} • {new Date(o.createdAt).toLocaleString()}</div>
              <div className="font-semibold mt-1">User: {o.userId}</div>
              <div className="text-sm text-gray-600 mt-1">Items: {o.items.length}</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-bold">${o.total.toFixed(2)}</div>

              <select
                value={o.status}
                onChange={(e) => {
                  const updated: Order = { ...o, status: e.target.value as OrderStatus, updatedAt: Date.now() };
                  dispatch(updateOrder(updated));
                }}
                className="border p-2 rounded"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <button
                onClick={() => {
                  if (!confirm("Delete this order?")) return;
                  dispatch(deleteOrder(o.orderId));
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && <div className="text-center text-gray-500">No orders found.</div>}
      </div>
    </div>
  );
}