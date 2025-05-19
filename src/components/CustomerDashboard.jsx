export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-700 text-white px-4 py-10 md:px-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Better Life With Crypto
      </h1>

      {/* Account Info */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
          Account
        </h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border border-white/30 text-sm">
            <thead>
              <tr className="bg-white/10">
                <th className="p-2 text-left">Setting</th>
                <th className="p-2 text-left">Value</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">Email</td>
                <td className="p-2">user@email.com</td>
                <td className="p-2">✅ Verified</td>
              </tr>
              <tr>
                <td className="p-2">Name</td>
                <td className="p-2">Jane Doe</td>
                <td className="p-2">✅ Set</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Data */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
          Popular
        </h2>
        <div className="overflow-auto">
          <table className="w-full table-auto border border-white/30 text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 text-left">Symbol</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">BTC</td>
                <td className="p-2">Bitcoin</td>
                <td className="p-2">$103,208.34</td>
                <td className="p-2 text-red-400">-0.01%</td>
              </tr>
              <tr>
                <td className="p-2">ETH</td>
                <td className="p-2">Ethereum</td>
                <td className="p-2">$2,463.78</td>
                <td className="p-2 text-green-400">+4.80%</td>
              </tr>
              <tr>
                <td className="p-2">BNB</td>
                <td className="p-2">BNB</td>
                <td className="p-2">$655.31</td>
                <td className="p-2 text-green-400">+3.02%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Purchase History */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
          Purchase History
        </h2>
        <div className="flex gap-4 mb-3">
          <select className="bg-white/20 px-3 py-1 rounded text-white text-sm">
            <option>Method</option>
          </select>
          <select className="bg-white/20 px-3 py-1 rounded text-white text-sm">
            <option>Status</option>
          </select>
        </div>
        <div className="overflow-auto">
          <table className="w-full table-auto border border-white/30 text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Merchant</th>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">Amount Paid</th>
                <th className="p-2 text-left">Payment Method</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Rewards Earned</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">May 12 2025</td>
                <td className="p-2">CryptoStore Inc.</td>
                <td className="p-2">Trezor Wallet</td>
                <td className="p-2">$129.00</td>
                <td className="p-2">Crypto</td>
                <td className="p-2">✅ Completed</td>
                <td className="p-2">645 pts (5%)</td>
              </tr>
              <tr>
                <td className="p-2">May 09 2025</td>
                <td className="p-2">CoffeeChain</td>
                <td className="p-2">Gift Card</td>
                <td className="p-2">$25.00</td>
                <td className="p-2">Visa Credit Card</td>
                <td className="p-2">✅ Completed</td>
                <td className="p-2">250 pts (promo)</td>
              </tr>
              <tr>
                <td className="p-2">May 07 2025</td>
                <td className="p-2">FitClub</td>
                <td className="p-2">1-Month Membership</td>
                <td className="p-2">$40.00</td>
                <td className="p-2">Crypto</td>
                <td className="p-2">❌ Failed</td>
                <td className="p-2">-</td>
              </tr>
              <tr>
                <td className="p-2">May 01 2025</td>
                <td className="p-2">NFTWear</td>
                <td className="p-2">Hoodie (Limited Drop)</td>
                <td className="p-2">$89.00</td>
                <td className="p-2">Bank</td>
                <td className="p-2">🕓 Applied</td>
                <td className="p-2">445 pts (5%)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Reward History */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-white/20 pb-1">
          Reward History
        </h2>
        <p className="text-lg font-bold mb-2">
          Total <span className="text-yellow-300">189</span> Tokens
        </p>
        <div className="overflow-auto">
          <table className="w-full table-auto border border-white/30 text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Reward Source</th>
                <th className="p-2 text-left">Tokens</th>
                <th className="p-2 text-left">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">May 12 2025</td>
                <td className="p-2">Purchase Cashback</td>
                <td className="p-2">64</td>
                <td className="p-2">5% reward on eligible item</td>
              </tr>
              <tr>
                <td className="p-2">May 09 2025</td>
                <td className="p-2">Payment Method Bonus</td>
                <td className="p-2">25</td>
                <td className="p-2">Extra 2% for paying with crypto</td>
              </tr>
              <tr>
                <td className="p-2">May 01 2025</td>
                <td className="p-2">First Purchase Bonus</td>
                <td className="p-2">100</td>
                <td className="p-2">Welcome reward</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
