import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.js";
import { useMemo } from "react";

export default function OrdersPage() {
  const allOrders = useSelector((s: RootState) => s.orders.orders);
  const user = useSelector((s: RootState) => s.auth.user);

  //just orders of current user
  const myOrders = useMemo(() => {
    if (!user) return [];
    return allOrders.filter(o => o.userId === user.username);
  }, [allOrders, user]);

  if (myOrders.length === 0) {
    return <p className="text-center text-gray-500 mt-8">You have no orders yet.</p>;
  }

  return (
    <div className="space-y-6">
      {myOrders.map(order => (
        <div key={order.orderId} className="border p-6 rounded-lg bg-white shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-gray-500">Order ID</div>
              <div className="font-semibold">{order.orderId}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Date</div>
              <div className="font-medium">{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className={`px-3 py-1 rounded-full text-sm ${order.status === "delivered" ? "bg-green-100 text-green-700"
                  : order.status === "paid" ? "bg-blue-100 text-blue-700"
                    : order.status === "shipped" ? "bg-yellow-100 text-yellow-700"
                      : order.status === "canceled" ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                }`}>{order.status}</div>
            </div>
          </div>

          <div className="space-y-3">
            {order.items.map(it => (
              <div key={it.id} className="flex items-center gap-4 border-b pb-3">
                <img src={it.image} alt={it.title} className="w-16 h-16 object-contain" />
                <div className="flex-1">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                </div>
                <div className="font-semibold">${it.price}</div>
              </div>
            ))}
          </div>

          <div className="text-right font-bold mt-4">Total: ${order.total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
