import { PieChart, Pie, Cell } from "recharts";
import { Search, Sun, Moon } from "lucide-react";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#ef4444",
  "#6366f1",
  "#f59e0b",
  "#0f172a",
];
const data = [
  { name: "USDT", value: 400 },
  { name: "USD", value: 300 },
  { name: "Airbnb", value: 300 },
  { name: "ETH", value: 200 },
  { name: "BTC", value: 200 },
  { name: "SOL", value: 100 },
];

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 md:px-12 py-6 text-white space-y-6 font-sans">
      {/* Top Header */}
      {/* Responsive Header */}
      <div className="rounded-full bg-white/10 px-4 py-2 flex items-center justify-between w-full max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-xl">👽</div>

        {/* Desktop Search + Controls */}
        <div className="hidden md:flex flex-1 items-center justify-between mx-4">
          <div className="flex items-center flex-1 rounded-full bg-white/10 px-4 py-1">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent text-sm placeholder-white/70 focus:outline-none"
            />
            <Search size={16} className="text-white/70" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Sun className="w-4 h-4 text-white/70" />
            <Moon className="w-4 h-4 text-white/70" />
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden text-2xl">☰</div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ...rest of your original layout remains unchanged... */}

          {/* Keep previous dashboard sections here: Account, Payout, Rewards, Sales, Transactions */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Account & Summary Left Side */}
        <div className="space-y-6">
          {/* Account Block */}
          <div className="bg-white/10 rounded-2xl p-4 space-y-3">
            <h2 className="text-lg font-semibold">Account</h2>
            <div className="overflow-hidden rounded-xl">
              <div className="grid grid-cols-2 text-sm font-medium text-[#0f172a] bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2">
                <span>Name/Email</span>
                <span className="text-right">Status</span>
              </div>
              <div className="flex justify-between items-center bg-white/10 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">Jane Doe</p>
                  <p className="text-xs text-white/70">merchant@gmail.com</p>
                </div>
                <button className="text-green-400 text-sm font-medium">
                  Verify
                </button>
              </div>
            </div>
          </div>

          {/* Payout Summary */}
          <div className="bg-white/10 rounded-2xl p-4 space-y-3">
            <h2 className="text-lg font-semibold">Payout Summary</h2>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Total Settled This Month</span>
              <span className="text-green-400">$10,000</span>
            </div>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Pending Payout</span>
              <span className="text-green-400">$2,000</span>
            </div>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Last Payout Date</span>
              <span className="text-cyan-400">May 10, 2025</span>
            </div>
            <div className="mt-2">
              <label className="text-sm block mb-1">Monthly Target</label>
              <div className="w-full bg-white/20 h-2 rounded-full relative">
                <div
                  className="bg-green-400 h-2 rounded-full"
                  style={{ width: "25%" }}
                />
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-white/10 rounded-2xl p-4 space-y-3">
            <h2 className="text-lg font-semibold">Rewards & Insights</h2>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Total Rewards Given</span>
              <span className="text-green-400">500 Tokens</span>
            </div>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Most Popular payment</span>
              <span className="text-cyan-400">Crypto</span>
            </div>
            <div className="flex justify-between bg-white/5 rounded-xl px-4 py-2 text-sm">
              <span>Transactions This Month</span>
              <span className="text-green-400">120</span>
            </div>
          </div>
        </div>

        {/* Total Sales Chart Right Side */}
        <div className="bg-white/10 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-4">Total Sales</h2>
          <div className="flex flex-col items-center">
            <PieChart width={250} height={250}>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={90}
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full mt-4">
              {data.map((entry, index) => (
                <div
                  key={entry.name}
                  className="flex justify-between bg-white/5 px-4 py-2 rounded-xl text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></span>
                    {entry.name}
                  </span>
                  <span className="text-green-400">$283</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Full Width */}
      <div className="bg-white/10 rounded-2xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <h2 className="text-lg font-semibold">Transaction</h2>
          <div className="flex gap-2">
            <select className="bg-white/10 px-3 py-1 rounded-md text-sm">
              <option>Method</option>
            </select>
            <select className="bg-white/10 px-3 py-1 rounded-md text-sm">
              <option>Status</option>
            </select>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="hidden md:grid grid-cols-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-[#0f172a] px-4 py-2 rounded-xl font-semibold">
            <span>Name</span>
            <span>Amount</span>
            <span>Method</span>
            <span>Status</span>
          </div>
          {[
            {
              name: "John",
              amount: "$200.00",
              method: "Credit",
              status: "Confirmed",
              color: "text-green-400",
            },
            {
              name: "John",
              amount: "0.05 BT",
              method: "Crypto",
              status: "Confirmed",
              color: "text-green-400",
            },
            {
              name: "John",
              amount: "$150.00",
              method: "Bank",
              status: "Transfer Refund",
              color: "text-cyan-400",
            },
            {
              name: "John",
              amount: "$75.00",
              method: "Credit",
              status: "Confirmed",
              color: "text-green-400",
            },
          ].map((tx, i) => (
            <div
              key={i}
              className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white/5 rounded-xl px-4 py-2"
            >
              <span>{tx.name}</span>
              <span>{tx.amount}</span>
              <span className="hidden md:inline">{tx.method}</span>
              <span className={tx.color}>{tx.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
