import { useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";

import { setPaymentMethod } from "../../redux/checkout/checkoutActions";

import PaymentOptionCard from "../common/PaymentOptionCard";

export default function PaymentMethodSelector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSelectMethod = (method) => {
    dispatch(setPaymentMethod(method)); // ✅ Set payment method in Redux
    navigate("/paymentsummary"); // ✅ Navigate to summary page
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 text-white text-center">
      {/* Welcome message */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome John Doe!</h1>
      <p className="text-lg text-gray-200 mb-10">
        Choose your preferred payment method to pay.
      </p>

      {/* Section title */}
      <h2 className="text-2xl font-semibold mb-6">Choose Payment Method</h2>

      {/* Payment options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Crypto Option */}
        <PaymentOptionCard
          title="Crypto"
          icon="🪙"
          label="Pay"
          description="Fast & secure"
          bg="bg-white"
          onClick={() => handleSelectMethod("crypto")}
        />

        {/* Credit Card Option */}
        <PaymentOptionCard
          title="Credit Card"
          icon="💳"
          label="Pay"
          description="Familiar & trusted"
          onClick={() => handleSelectMethod("card")}
          bg="bg-white"
          text="text-blue-900"
        />

        {/* Bank Transfer Option */}
        <PaymentOptionCard
          title="Bank Transfer"
          icon="🏦"
          label="Pay"
          description="Low fees"
          onClick={() => handleSelectMethod("bank")}
          bg="bg-white"
          text="text-blue-900"
        />
      </div>
    </div>
  );
}
