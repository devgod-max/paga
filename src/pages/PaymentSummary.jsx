import PaymentSummary from "../components/checkout/PaymentSummary";

export default function Checkout() {
  return (
    <div className="h-flex flex-col bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
      <PaymentSummary />
    </div>
  );
}
