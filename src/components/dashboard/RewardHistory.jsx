import Table from "../common/Table";

// src/components/dashboard/RewardHistory.jsx
export default function RewardHistory(rewardHistory) {
  const columns = ["Data", "Reward Source", "Tokens", "Note"];
  const data = rewardHistory.data.map((his) => {
    return {
      data: new Date(his.created_at).toLocaleString(),
      reward_source: his.source,
      tokens: his.tokens,
      note: his.note,
    };
  });
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
        Reward History
      </h2>
      <p className="text-lg font-bold mb-2">
        Total <span className="text-yellow-300">189</span> Tokens
      </p>
      <Table columns={columns} data={data} />
    </section>
  );
}
