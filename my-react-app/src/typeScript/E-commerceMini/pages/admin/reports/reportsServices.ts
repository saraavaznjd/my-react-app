import type { Reports, MonthlySale, ReportRange } from "../../../types/types.js";
import type { Order } from "../../../features/orders/ordersSlice.js";
import { getAllOrders } from "../../../features/orders/ordersServices.js";

/** helper: start of day */
const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0,0,0,0);
  return x.getTime();
};

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

/** Build reports for given time range */
export function buildReports(range: ReportRange = "all"): Reports {
  const all = getAllOrders();

  const now = Date.now();
  let from = 0;
  if (range === "today") {
    from = startOfDay(new Date());
  } else if (range === "7days") {
    from = now - 7 * 24 * 60 * 60 * 1000;
  } else if (range === "30days") {
    from = now - 30 * 24 * 60 * 60 * 1000;
  } else if (range === "year") {
    const d = new Date();
    d.setMonth(0, 1);
    d.setHours(0,0,0,0);
    from = d.getTime();
  } else {
    from = 0;
  }

  const filtered = all.filter(o => o.createdAt >= from);

  const totalRevenue = filtered.reduce((s, o) => s + o.total, 0);
  const totalOrders = filtered.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;
  const deliveredOrders = filtered.filter(o => o.status === "delivered").length;
  const pendingOrders = filtered.filter(o => o.status === "pending").length;

  // monthly sales for last 12 months (including months with 0)
  const monthsMap = new Map<string, number>();
  const months: string[] = [];
  const current = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(current.getFullYear(), current.getMonth() - i, 1);
    const key = monthKey(d);
    months.push(key);
    monthsMap.set(key, 0);
  }

  for (const o of filtered) {
    const key = monthKey(new Date(o.createdAt));
    if (monthsMap.has(key)) monthsMap.set(key, (monthsMap.get(key) || 0) + o.total);
  }

  const monthlySales: MonthlySale[] = months.map(m => ({ month: m, total: monthsMap.get(m) || 0 }));

  const recentOrders = filtered
    .slice()
    .sort((a,b) => b.createdAt - a.createdAt)
    .slice(0, 8)
    .map(o => ({ id: o.orderId, ...(o.userId ? { userId: o.userId } : {}), total: o.total, status: o.status, createdAt: o.createdAt }));

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue,
    deliveredOrders,
    pendingOrders,
    monthlySales,
    recentOrders,
  };
}
