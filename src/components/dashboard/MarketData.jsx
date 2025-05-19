import React from "react";
import Table from "../common/Table";

export default function MarketData(cryptos) {
  const columns = ["Type", "Name", "Price(USD)"];

  const data = cryptos.cryptos.map((crypto) => {
    return {
      type: crypto.type,
      name: crypto.name,
      rate: crypto.rate,
    };
  });

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
        Market Data
      </h2>
      <Table columns={columns} data={data} />
    </section>
  );
}
