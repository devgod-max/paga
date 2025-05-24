import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import {
  fetchCardAndBankData,
  fetchCheckoutData,
  setPaymentMethod_1,
} from "../../redux/checkout/checkoutActions";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Gift,
  Loader2,
} from "lucide-react";

import LoadingScreen from "../common/LoadingScreen";

export default function PaymentSummary() {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rewardsEarned, setRewardsEarned] = useState(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const { details } = useSelector((state) => state.checkout);
  const method = sessionStorage.getItem("method_1");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("authUser"));
        dispatch(setPaymentMethod_1(method));
        setUsername(user.user_metadata.name);
        await dispatch(fetchCardAndBankData(user.id));
        await dispatch(fetchCheckoutData(method));
      } finally {
        setLoading(false);
      }
    };

    if (method) loadData();
  }, [dispatch]);

  if (loading || !details || Object.keys(details).length === 0) {
    return <LoadingScreen message="Loading payment summary..." />;
  }

  const handlePayment = async () => {
    try {
      setProcessing(true);
      const authUser = await supabase.auth.getUser();
      const user = authUser.data?.user;
      if (!user) throw new Error("User not authenticated");

      const rewardAmount = Math.floor(details.usdPrice * 0.05);
      const cryptoAmount =
        method === "crypto" ? details.cryptoPrice : details.usdPrice;

      await supabase.from("purchase_history").insert([
        {
          user_email: user.email,
          item: details.item,
          amount_paid: cryptoAmount,
          payment_method: method,
          points: rewardAmount,
          status: "Completed",
          merchant_name: details.merchant_name,
        },
      ]);

      await supabase.from("reward_history").insert([
        {
          user_email: user.email,
          tokens: rewardAmount,
          source: "Purchase Cashback",
          note: `5% reward on ${details.item}`,
        },
      ]);

      setRewardsEarned(rewardAmount);
      setSuccess(true);
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const buttonLabel =
    method === "crypto"
      ? `Pay (${details?.cryptoPrice?.toFixed(4)} ETH) $${(
          details?.cryptoPrice * details?.rate
        ).toFixed(2)} Now`
      : `Pay $${details?.usdPrice} Now`;

  const goBack = () => navigate("/paymentsource");

  return (
    <div className="w-full bg-white text-black px-4 py-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-1">
        Welcome {username}!
      </h1>
      <p className="text-gray-500 text-sm mb-8">Pay with {method}</p>

      <div className="w-full max-w-2xl border border-gray-200 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <div className="space-y-3 text-sm">
          <SummaryRow label="Item" value="1-month membership" />
          <SummaryRow label="Quantity" value="1" />
          {method === "crypto" && (
            <SummaryRow
              label="Crypto Type"
              value={
                <select className="border border-gray-200 rounded px-2 py-1 bg-white text-sm">
                  <option value="ETH">ETH</option>
                </select>
              }
            />
          )}
          <SummaryRow
            label="Price"
            value={
              method === "crypto"
                ? `${details?.cryptoPrice?.toFixed(3)} ($${(
                    details.cryptoPrice * details.rate
                  ).toFixed(2)})`
                : `$${details?.usdPrice}`
            }
          />
          <SummaryRow
            label="Fees"
            value={
              method === "crypto"
                ? `${(details.cryptoPrice / 10).toFixed(4)} ($${(
                    (details.cryptoPrice * details.rate) /
                    10
                  ).toFixed(2)})`
                : `$${(details.usdPrice / 10).toFixed(2)}`
            }
          />
          <SummaryRow
            label="Rewards"
            value={`5% cashback = ${
              rewardsEarned ?? (details?.usdPrice * 0.05).toFixed(0)
            } tokens`}
          />
          <SummaryRow label="Discount" value="10% off merchant discount" />
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3 justify-between items-center">
          <button
            onClick={goBack}
            className="w-full md:w-auto flex items-center justify-center gap-2 border border-black text-black py-2 px-4 rounded-full hover:bg-black hover:text-white transition"
          >
            <ArrowLeft size={16} />
            Back To Previous Page
          </button>

          <button
            onClick={handlePayment}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-400 hover:bg-green-300 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            {buttonLabel}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {processing && (
        <Modal>
          <Loader2 className="animate-spin text-cyan-400 w-10 h-10 mb-4" />
          <h3 className="text-lg font-semibold mb-1">
            Processing Your Payment
          </h3>
          <p className="text-gray-500 text-sm">
            Waiting for wallet confirmation
          </p>
        </Modal>
      )}

      {success && rewardsEarned !== null && (
        <Modal>
          <ShieldCheck className="w-10 h-10 text-blue-500 mb-2" />
          <h3 className="text-lg font-semibold mb-1">Payment Successful!</h3>
          <p className="text-sm mb-4">
            You paid {details?.cryptoPrice?.toFixed(4)} ETH ($
            {(details.cryptoPrice * details.rate).toFixed(2)})
          </p>

          <Gift className="w-10 h-10 text-cyan-400 mb-2" />
          <h3 className="text-lg font-semibold mb-1">🎉 Congratulations!</h3>
          <p className="text-sm mb-1">
            You earned {rewardsEarned} tokens as rewards
          </p>
          <p className="text-sm text-green-600 mb-4">
            Your new balance: 150 tokens
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full border border-black text-black font-semibold py-2 rounded-full hover:bg-black hover:text-white transition"
          >
            OK
          </button>
        </Modal>
      )}
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between items-center px-4 py-2 rounded border border-gray-100 bg-gray-50">
      <span className="font-medium">{label}</span>
      <span className="text-green-500 text-sm">{value}</span>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-2xl px-6 py-8 max-w-sm w-full text-center shadow-xl">
        {children}
      </div>
    </div>
  );
}
