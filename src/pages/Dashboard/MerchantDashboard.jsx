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
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#121826] to-[#102232] text-white px-4 py-6 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Payout Summary */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#1b1f2c] to-[#141925] p-6 space-y-6 shadow-inner">
            <h2 className="font-bold text-2xl text-white">Payout Summary</h2>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Total Settled This Month
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                $10,000
              </span>
            </div>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Pending Payout
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                $2,000
              </span>
            </div>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Total Settled This Month
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                May 10, 2025
              </span>
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold mb-2">Monthly Target</p>
              <div className="relative w-full h-3 bg-[#404452] rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-[#00ffd1] rounded-full"
                  style={{ width: "28%" }}
                />
                <div className="absolute left-[28%] -top-6 text-xs bg-[#0f172a] border border-[#00ffd1] text-white px-2 py-0.5 rounded-full shadow-sm">
                  28%
                </div>
              </div>
            </div>
          </div>

          {/* Rewards & Insights */}
          <div className="rounded-[32px] bg-gradient-to-br from-[#1b1f2c] to-[#141925] p-6 space-y-6 shadow-inner">
            <h2 className="font-bold text-2xl text-white">
              Rewards & Insights
            </h2>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Total Rewards Given
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                500 Tokens
              </span>
            </div>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Most Popular Payment
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                Crypto
              </span>
            </div>
            <div className="bg-[#2a2e3a] px-6 py-5 rounded-[20px] flex justify-between items-center">
              <span className="text-white text-base font-medium">
                Transactions
              </span>
              <span className="text-[#00ffd1] font-semibold text-base">
                120
              </span>
            </div>
          </div>
        </div>

        {/* Total Sales */}
        <div className="rounded-[32px] bg-gradient-to-br from-[#1b1f2c] to-[#141925] p-6 space-y-6 shadow-inner">
          <h2 className="font-bold text-2xl text-white">Total Sales</h2>
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
                  className="border border-white/10 bg-[#2a2e3a] rounded-full px-3 py-1 flex items-center gap-2 justify-between"
                >
                  <span className="font-medium text-white">{s.name}</span>
                  <span className="text-[#00ffd1]">${s.value.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Full Width */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#1b1f2c] to-[#141925] p-6 overflow-auto shadow-inner">
        <h2 className="font-bold text-2xl text-white mb-4">Transaction</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-400 to-sky-500 text-white">
              <th className="text-left py-3 px-4 rounded-l-full font-semibold">
                Date
              </th>
              <th className="text-left py-3 px-4 font-semibold">Customer</th>
              <th className="text-left py-3 px-4 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 font-semibold">Method</th>
              <th className="text-left py-3 px-4 rounded-r-full font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="text-white/90 divide-y divide-[#2a2e3a]">
            {transactions.map((t, i) => {
              const isConfirmed = t.status.toLowerCase().includes("confirm");
              const isRefund = t.status.toLowerCase().includes("refund");
              const statusColor = isConfirmed
                ? "text-[#00ffd1]"
                : isRefund
                ? "text-[#38bdf8]"
                : "text-white";
              return (
                <tr key={i} className="rounded-xl">
                  <td className="py-4 px-4 rounded-l-xl">{t.date}</td>
                  <td className="py-4 px-4">{t.customer}</td>
                  <td className="py-4 px-4">{t.amount}</td>
                  <td className="py-4 px-4">{t.method}</td>
                  <td
                    className={`py-4 px-4 rounded-r-xl font-semibold flex items-center gap-1 ${statusColor}`}
                  >
                    {t.status}
                    {isConfirmed && (
                      <FaCheckCircle className="text-[#00ffd1]" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
