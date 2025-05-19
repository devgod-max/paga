import {
  Bar,
  Pie,
  Line,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie as RePie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
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
  const [sales, setSales] = useState([
    { name: "USD", value: 2863.54 },
    { name: "BTC", value: 283.54 },
    { name: "ETH", value: 283.54 },
    { name: "BNB", value: 283.54 },
    { name: "USDT", value: 283.54 },
    { name: "USDC", value: 283.54 },
    { name: "SOL", value: 283.54 },
  ]);

  const [transactions, setTransactions] = useState([
    {
      date: "Apr 23",
      customer: "John Doe",
      amount: "$200",
      method: "Credit Card",
      status: "Confirmed",
    },
    {
      date: "Apr 22",
      customer: "John Doe",
      amount: "0.05 BTC",
      method: "Crypto",
      status: "Confirmed",
    },
    {
      date: "Apr 22",
      customer: "John Doe",
      amount: "$150",
      method: "Bank",
      status: "Transfer Refunded",
    },
    {
      date: "Apr 21",
      customer: "John Doe",
      amount: "$75",
      method: "Credit",
      status: "Card Confirmed",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-blue-900 text-white px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Better Life With Crypto
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Total Sales Pie Chart */}
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <RePie
                data={sales}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {sales.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </RePie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-4 text-sm space-y-1">
            {sales.map((s, i) => (
              <li key={i}>
                {s.name}: ${s.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Payout Summary */}
        <div className="bg-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Payout Summary</h2>
          <p>
            Total Settled This Month: <span className="font-bold">$10,000</span>
          </p>
          <p>
            Pending Payout: <span className="font-bold">$2,000</span>
          </p>
          <p>
            Last Payout Date: <span className="font-bold">May 10, 2025</span>
          </p>
          <div className="mt-4">
            <p className="mb-1">Monthly Target</p>
            <div className="w-full h-4 bg-white/20 rounded-full">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: "80%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white/10 rounded-xl p-6 mt-10 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Transaction</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-white/80">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Method</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-t border-white/20">
                <td className="p-2">{t.date}</td>
                <td className="p-2">{t.customer}</td>
                <td className="p-2">{t.amount}</td>
                <td className="p-2">{t.method}</td>
                <td className="p-2 flex items-center gap-2">
                  {t.status} <FaCheckCircle className="text-green-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rewards & Insights */}
      <div className="bg-white/10 rounded-xl p-6 mt-10">
        <h2 className="text-xl font-semibold mb-4">Rewards & Insights</h2>
        <p>
          Total Rewards Given: <span className="font-bold">500 tokens</span>
        </p>
        <p>
          Most Popular Payment: <span className="font-bold">Crypto</span>
        </p>
        <p>
          Transactions This Month: <span className="font-bold">120</span>
        </p>
      </div>
    </div>
  );
}
