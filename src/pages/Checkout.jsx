import PaymentMethodSelection from "../components/checkout/PaymentMethodSelector";

export default function Checkout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <PaymentMethodSelection />
      </div>
    </div>
  );
}
