import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const COLORS = [
  "#00C49F",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#FF6384",
  "#36A2EB",
];

export default function MerchantDashboard() {
  const [sales] = useState([
    { name: "USD", value: 2863.54 },
    { name: "BTC", value: 283.54 },
    { name: "ETH", value: 283.54 },
    { name: "BNB", value: 283.54 },
    { name: "USDT", value: 283.54 },
    { name: "USDC", value: 283.54 },
    { name: "SOL", value: 283.54 },
  ]);

  const [transactions] = useState([
    {
      date: "April 23",
      customer: "John Doe",
      amount: "$200.00",
      method: "Credit",
      status: "Confirmed",
    },
    {
      date: "April 22",
      customer: "John Doe",
      amount: "0.05 BT",
      method: "Crypto",
      status: "Confirmed",
    },
    {
      date: "April 22",
      customer: "John Doe",
      amount: "$150.00",
      method: "Bank",
      status: "Transfer Refund",
    },
    {
      date: "April 21",
      customer: "John Doe",
      amount: "$75.00",
      method: "Credit",
      status: "Confirmed",
    },
  ]);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Payout Summary */}
          <div className="rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-lg">Payout Summary</h2>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Total Settled This Month</span>
              <span className="text-emerald-500 font-semibold">$10,000</span>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Pending Payout</span>
              <span className="text-emerald-500 font-semibold">$2,000</span>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Total Settled This Month</span>
              <span className="text-emerald-500 font-semibold">
                May 10, 2025
              </span>
            </div>
            <div>
              <p className="text-sm mb-1">Monthly Target</p>
              <div className="h-2 bg-gray-200 rounded-full w-full">
                <div className="h-full bg-emerald-600 w-4/5 rounded-full" />
              </div>
            </div>
          </div>

          {/* Rewards & Insights */}
          <div className="rounded-2xl border border-gray-200 p-6 space-y-4">
            <h2 className="font-bold text-lg">Rewards & Insights</h2>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Total Rewards Given</span>
              <span className="text-emerald-500 font-semibold">500 Tokens</span>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Most Popular Payment</span>
              <span className="text-emerald-500 font-semibold">Crypto</span>
            </div>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex justify-between">
              <span>Transactions</span>
              <span className="text-emerald-500 font-semibold">120</span>
            </div>
          </div>
        </div>

        {/* Total Sales */}
        <div className="rounded-2xl border border-gray-200 p-6 space-y-4">
          <h2 className="font-bold text-lg">Total Sales</h2>
          <div className="flex flex-col gap-6 items-center">
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sales}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                  >
                    {sales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm w-full">
              {sales.map((s, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2 justify-between"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-emerald-500">
                    ${s.value.toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Full Width */}
      <div className="rounded-2xl border border-gray-200 p-6 overflow-auto">
        <h2 className="font-bold text-lg mb-2">Transaction</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white">
              <th className="text-left py-2 px-3 rounded-l-full">Date</th>
              <th className="text-left py-2 px-3">Customer</th>
              <th className="text-left py-2 px-3">Amount</th>
              <th className="text-left py-2 px-3">Method</th>
              <th className="text-left py-2 px-3 rounded-r-full">Status</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {transactions.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3">{t.date}</td>
                <td className="py-2 px-3">{t.customer}</td>
                <td className="py-2 px-3">{t.amount}</td>
                <td className="py-2 px-3">{t.method}</td>
                <td className="py-2 px-3 text-emerald-500 font-medium flex items-center gap-1">
                  {t.status}
                  {t.status.toLowerCase().includes("confirm") && (
                    <FaCheckCircle className="text-emerald-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
