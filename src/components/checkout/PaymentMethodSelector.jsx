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
    <div className="h-full max-w-7xl mx-auto text-white text-center">
      {/* Welcome message */}
      <h1 className="font-grifter font-bold mb-2 text-[#f2f2f2] text-[56px]">
        Let's go!
      </h1>
      <p className="text-[18px] font-aeonik text-[#f2f2f2] mb-10">
        Pay your way — email or wallet. Earn 5 PAY tokens instantly with this
        checkout.
      </p>

      {/* Payment options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <PaymentOptionCard
          title="Fast & secure"
          description="Fastest checkout, best rewards"
          iconSrc="https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg"
          label="Pay"
          methodLabel="Crypto Currency"
          highlight="Best Rewards"
          onClick={() => handleSelectMethod_1("crypto")}
        />

        <PaymentOptionCard
          title="Familiar & trusted"
          description="Use your Visa or Mastercard"
          iconSrc="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
          label="Pay"
          methodLabel="Credit Card"
          onClick={() => handleSelectMethod_1("card")}
        />
        <PaymentOptionCard
          title="Low fees"
          description="Low-fee transfer"
          iconSrc="https://img.icons8.com/color/48/bank.png"
          label="Pay"
          methodLabel="Bank Transfer"
          onClick={() => handleSelectMethod_1("bank")}
        />
      </div>

      {/* How it works */}
      <h2 className="text-5xl font-grifter mb-10 text-white">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {[...Array(4)].map((_, i) => {
          const steps = [
            "Sign in with email - No wallet or keys required",
            "Choose how to pay - Crypto, card, or bank",
            "Complete your payment - Instant confirmation",
            "Earn rewards - Get tokens, discounts & more",
          ];
          return (
            <div
              key={i}
              className="border border-white/10 rounded-2xl px-4 py-6 text-left bg-gradient-to-br from-[#1b1f2c] to-[#141925] font-aeonik text-white/80"
            >
              <p className="mb-2">{steps[i]}</p>
              <span className="font-bold text-cyan-300 text-2xl">{`0${
                i + 1
              }`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
