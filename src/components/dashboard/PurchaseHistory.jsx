import React from "react";
import Table from "../common/Table";

export default function PurchaseHistory(purchaseHistory) {
  const columns = [
    "Date",
    "Merchant",
    "Item",
    "Amount Paid",
    "Payment Method",
    "Status",
    "Rewards Earned",
  ];
  const data = purchaseHistory.data.map((his) => {
    return {
      date: new Date(his.created_at).toLocaleString(),
      merchant: his.merchant_name,
      item: his.item,
      amount_paid: his.amount_paid,
      payment_method: his.payment_method,
      status: his.status,
      reward_earned: his.points,
    };
  });
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
        Purchase History
      </h2>
      <Table columns={columns} data={data} />
    </section>
  );
}
