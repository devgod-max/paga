import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setPaymentMethod_1 } from "../../redux/checkout/checkoutActions";

import PaymentOptionCard from "../common/PaymentOptionCard";

export default function PaymentMethodSelector() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector((status) => status.auth);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("authUser"));
    setUsername(user.user_metadata.name);
  }, [status]);

  const handleSelectMethod_1 = (method) => {
    dispatch(setPaymentMethod_1(method));
    navigate("/paymentsource");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 text-black text-center">
      {/* Welcome message */}
      <h1 className="text-4xl font-bold mb-2">Welcome {username}!</h1>
      <p className="text-base text-gray-600 mb-10">
        Choose your preferred payment method to pay.
      </p>

      {/* Payment options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <PaymentOptionCard
          title="Fast & secure"
          icon="🪙"
          label="Pay"
          methodLabel="Bank Transfer"
          onClick={() => handleSelectMethod_1("crypto")}
          // className="bg-white border border-gray-200 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300"
        />
        <PaymentOptionCard
          title="Familiar & trusted"
          icon="💳"
          label="Pay"
          methodLabel="Credit Card"
          onClick={() => handleSelectMethod_1("card")}
          // className="bg-white border border-gray-200 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300"
        />
        <PaymentOptionCard
          title="Low fees"
          icon="🏦"
          label="Pay"
          methodLabel="Bank Transfer"
          onClick={() => handleSelectMethod_1("bank")}
          // className="bg-white border border-gray-200 hover:bg-gradient-to-br hover:from-cyan-500 hover:to-blue-600 hover:text-white transition-all duration-300"
        />
      </div>

      {/* How it works */}
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="border rounded-xl px-4 py-6 text-left bg-white text-gray-700">
          <p className="mb-2">
            Sign in with email - No wallet or keys required
          </p>
          <span className="font-bold text-gray-400 text-2xl">01</span>
        </div>
        <div className="border rounded-xl px-4 py-6 text-left bg-white text-gray-700">
          <p className="mb-2">Choose how to pay - Crypto, card, or bank</p>
          <span className="font-bold text-gray-400 text-2xl">02</span>
        </div>
        <div className="border rounded-xl px-4 py-6 text-left bg-white text-gray-700">
          <p className="mb-2">Complete your payment - Instant confirmation</p>
          <span className="font-bold text-gray-400 text-2xl">03</span>
        </div>
        <div className="border rounded-xl px-4 py-6 text-left bg-white text-gray-700">
          <p className="mb-2">Earn rewards - Get tokens, discounts & more</p>
          <span className="font-bold text-gray-400 text-2xl">04</span>
        </div>
      </div>
    </div>
  );
}
