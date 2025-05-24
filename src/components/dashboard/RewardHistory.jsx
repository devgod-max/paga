import Table from "../common/Table";

// src/components/dashboard/RewardHistory.jsx
export default function RewardHistory(rewardHistory) {
  const columns = ["Date", "Reward Source", "Tokens", "Note"];

  const data = rewardHistory.data.map((his) => ({
    date: new Date(his.created_at).toLocaleDateString(),
    reward_source: <span className="text-black">{his.source}</span>,
    tokens: (
      <span className="text-emerald-500 font-semibold">{his.tokens}</span>
    ),
    note: <span className="text-gray-500 text-sm">{his.note}</span>,
  }));

  const totalTokens = rewardHistory.data.reduce(
    (sum, his) => sum + (his.tokens || 0),
    0
  );

  return (
    <section className="w-full max-w-6xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Reward History</h2>
        <p className="text-sm font-bold text-cyan-500">
          Total <span className="text-emerald-500">{totalTokens}</span> Tokens
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Custom Gradient Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-t-2xl grid grid-cols-4 gap-2">
          {columns.map((col, idx) => (
            <div key={idx} className="whitespace-nowrap">
              {col}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="p-4">
          <Table columns={columns} data={data} hideHeader />
        </div>
      </div>
    </section>
  );
}
