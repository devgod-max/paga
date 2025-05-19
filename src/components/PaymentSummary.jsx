import { useState } from "react";

export default function PaymentSummary() {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white px-4 py-12 flex flex-col items-center relative">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        Welcome John Doe!
      </h1>
      <p className="text-md md:text-lg text-blue-100 mb-6 text-center">
        Pay with Crypto
      </p>

      <div className="bg-white/10 border border-white/30 backdrop-blur rounded-xl p-6 md:p-8 w-full max-w-md text-sm md:text-base relative">
        <h2 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">
          Summary
        </h2>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Item:</span> 1-month membership
          </p>
          <p>
            <span className="font-medium">Quantity:</span> 1
          </p>
          <p>
            <span className="font-medium">Payment Method:</span> Credit Card
          </p>

          <div className="flex items-center justify-between">
            <label htmlFor="cryptoType" className="font-medium">
              Crypto Type:
            </label>
            <select
              id="cryptoType"
              className="bg-white/20 rounded px-2 py-1 text-white"
            >
              <option>ETH</option>
              <option>BTC</option>
              <option>USDC</option>
            </select>
          </div>

          <p>
            <span className="font-medium">Price:</span> 0.05 ($100.00)
          </p>
          <p>
            <span className="font-medium">Fees:</span> 0.005 ($10)
          </p>
          <p>
            <span className="font-medium">Conversion:</span> 1 ETH = $2000
          </p>
          <p>
            <span className="font-medium">Rewards:</span> 5% cashback = 5 tokens
          </p>
          <p>
            <span className="font-medium">Discount:</span> 10% off merchant
            discount
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handlePayment}
            className="w-full bg-sky-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-sky-300 transition"
          >
            Pay 0.055 ETH ($105.00) Now
          </button>
          <button className="w-full border border-white/30 text-white py-2 rounded-lg hover:bg-white/10 transition">
            Back to Payment Method
          </button>
        </div>

        {processing && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-lg font-semibold mb-1">
              Processing your payment...
            </p>
            <p className="text-sm text-gray-200">
              Waiting for wallet confirmation
            </p>
          </div>
        )}

        {success && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4 rounded-xl">
            <h3 className="text-2xl font-bold text-white mb-2">
              Payment Successful!
            </h3>
            <p className="mb-2 text-base">You paid 0.055 ETH ($105.00)</p>
            <h4 className="text-xl font-semibold text-green-300 mb-1">
              🎉 Congratulations!
            </h4>
            <p className="text-sm mb-1">You earned 5 tokens as rewards</p>
            <p className="text-sm mb-4">Your new balance: 150 tokens</p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-white text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
