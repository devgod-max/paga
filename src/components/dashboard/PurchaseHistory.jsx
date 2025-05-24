import React, { useState } from "react";
import Table from "../common/Table";

export default function PurchaseHistory(purchaseHistory) {
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const columns = [
    "Date",
    "Merchant",
    "Item",
    "Amount Paid",
    "Payment Method",
    "Status",
    "Rewards Earned",
  ];

  const filteredData = purchaseHistory.data
    .filter((item) =>
      methodFilter === "All" ? true : item.payment_method === methodFilter
    )
    .filter((item) =>
      statusFilter === "All" ? true : item.status === statusFilter
    )
    .map((his) => ({
      date: new Date(his.created_at).toLocaleDateString(),
      merchant: <span className="text-black">{his.merchant_name}</span>,
      item: <span className="text-gray-700">{his.item}</span>,
      amount_paid: (
        <span className="text-emerald-500 font-medium">${his.amount_paid}</span>
      ),
      payment_method: <span className="text-black">{his.payment_method}</span>,
      status: (
        <span
          className={`font-semibold text-sm ${
            his.status === "Completed"
              ? "text-emerald-500"
              : his.status === "Failed"
              ? "text-red-500"
              : "text-yellow-500"
          }`}
        >
          {his.status}
        </span>
      ),
      reward_earned: (
        <span className="text-cyan-500 font-medium">{his.points} pts (PH)</span>
      ),
    }));

  return (
    <section className="w-full max-w-6xl mx-auto mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Purchase History</h2>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-1 text-sm text-black"
          >
            <option>All</option>
            <option>Crypto</option>
            <option>Via Credit Card</option>
            <option>Bank</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-1 text-sm text-black"
          >
            <option>All</option>
            <option>Completed</option>
            <option>Failed</option>
            <option>Applied</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        {/* Gradient Table Header (override in your Table component if needed) */}
        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-t-2xl grid grid-cols-7 gap-2">
          {columns.map((col, idx) => (
            <div key={idx} className="whitespace-nowrap">
              {col}
            </div>
          ))}
        </div>

        {/* Table Body */}
        <div className="p-4">
          <Table columns={columns} data={filteredData} hideHeader />
        </div>
      </div>
    </section>
  );
}
