import PaymentMethodSelection from "../components/checkout/PaymentMethodSelector";

export default function Checkout() {
  return (
    <div className="w-full bg-white text-black flex items-center justify-center px-4 py-12">
      <PaymentMethodSelection />
    </div>
  );
}
