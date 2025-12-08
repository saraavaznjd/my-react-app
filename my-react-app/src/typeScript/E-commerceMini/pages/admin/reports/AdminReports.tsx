import React, { useMemo, useState } from "react";
import { buildReports } from "./reportsServices.js";
import type { ReportRange } from "../../../types/types.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function currency(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

const ranges: { key: ReportRange; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7days", label: "Last 7 Days" },
  { key: "30days", label: "Last 30 Days" },
  { key: "year", label: "This Year" },
  { key: "all", label: "All Time" },
];

export default function AdminReports() {
  const [range, setRange] = useState<ReportRange>("30days");
  const reports = useMemo(() => buildReports(range), [range]);

  const exportCSV = () => {
    // build CSV from monthly sales and recent orders
    const rows: string[][] = [];
    rows.push(["Metric","Value"]);
    rows.push(["Total Revenue", String(reports.totalRevenue)]);
    rows.push(["Total Orders", String(reports.totalOrders)]);
    rows.push(["Average Order", String(reports.averageOrderValue)]);
    rows.push([]);
    rows.push(["Monthly Sales"]);
    rows.push(["Month","Total"]);
    for (const m of reports.monthlySales) rows.push([m.month, String(m.total)]);
    rows.push([]);
    rows.push(["Recent Orders"]);
    rows.push(["Order ID","User","Total","Status","CreatedAt"]);
    for (const o of reports.recentOrders) rows.push([String(o.id), String(o.userId || ""), String(o.total), String(o.status), new Date(o.createdAt).toLocaleString()]);

    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reports_${range}_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">📊 Reports</h1>

        <div className="flex items-center gap-3">
          {ranges.map(r => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className={`px-3 py-1 rounded ${r.key === range ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {r.label}
            </button>
          ))}
          <button onClick={exportCSV} className="ml-3 px-3 py-1 rounded bg-blue-600 text-white">Export CSV</button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-xl font-bold mt-2">{currency(reports.totalRevenue)}</div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-xl font-bold mt-2">{reports.totalOrders}</div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="text-sm text-gray-500">Average Order</div>
          <div className="text-xl font-bold mt-2">{currency(reports.averageOrderValue)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="font-semibold mb-3">Monthly Sales</h2>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reports.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => currency(Number(value))} />
              <Line type="monotone" dataKey="total" stroke="#0b74ff" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Orders</h2>
        </div>

        <div className="space-y-3">
          {reports.recentOrders.map(o => (
            <div key={o.id} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="text-sm text-gray-500">#{o.id}</div>
                <div className="font-medium">User: {o.userId}</div>
                <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleString()}</div>
              </div>

              <div className="text-right">
                <div className="font-semibold">{currency(o.total)}</div>
                <div className="text-sm text-gray-500">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
