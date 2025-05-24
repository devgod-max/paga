import React from "react";
import Table from "../common/Table";

export default function MarketData(cryptos) {
  const columns = ["Type", "Name", "Price(USD)"];

  const data = cryptos.cryptos.map((crypto) => ({
    type: (
      <div className="flex items-center gap-2 text-black font-medium">
        <img src={crypto.icon} alt={crypto.type} className="w-5 h-5" />
        {crypto.type}
      </div>
    ),
    name: <span className="text-gray-500 text-sm">{crypto.name}</span>,
    rate: (
      <div className="text-right">
        <p className="text-emerald-500 font-semibold">{crypto.price}</p>
        <p
          className={`text-xs ${
            parseFloat(crypto.change) < 0 ? "text-red-500" : "text-green-500"
          }`}
        >
          {crypto.change}
        </p>
      </div>
    ),
  }));

  return (
    <section className="w-full max-w-2xl mx-auto mb-10">
      <h2 className="text-xl font-semibold mb-4">Market Data</h2>
      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <Table columns={columns} data={data} />
      </div>
    </section>
  );
}
