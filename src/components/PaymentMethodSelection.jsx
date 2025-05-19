export default function PaymentMethodSelection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
        Welcome John Doe!
      </h1>
      <p className="text-md md:text-lg text-gray-200 mb-8 text-center max-w-md">
        Choose your preferred payment method to pay.
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Crypto Option */}
        <div className="border border-white/30 p-6 rounded-xl bg-white/10 text-center hover:shadow-xl transition">
          <div className="text-4xl mb-2">🪙</div>
          <p className="mb-4 text-lg font-medium">Fast & secure</p>
          <button className="w-full bg-cyan-300 text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-cyan-200 transition">
            Pay
          </button>
        </div>

        {/* Credit Card Option */}
        <div className="border border-white/30 p-6 rounded-xl bg-white/10 text-center hover:shadow-xl transition">
          <div className="text-4xl mb-2">💳</div>
          <p className="mb-4 text-lg font-medium">Familiar & trusted</p>
          <button className="w-full bg-white text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Pay
          </button>
        </div>

        {/* Bank Transfer Option */}
        <div className="border border-white/30 p-6 rounded-xl bg-white/10 text-center hover:shadow-xl transition">
          <div className="text-4xl mb-2">🏦</div>
          <p className="mb-4 text-lg font-medium">Low fees</p>
          <button className="w-full bg-white text-blue-900 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
            Pay
          </button>
        </div>
      </div>

      <button className="mt-12 text-sm text-cyan-200 hover:underline hover:text-cyan-100">
        Back to Sign In
      </button>
    </div>
  );
}
