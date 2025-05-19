import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import { fetchCheckoutData } from "../../redux/checkout/checkoutActions";

export default function PaymentSummary() {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const { method, details } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (method) {
      dispatch(fetchCheckoutData(method));
    }
  }, [dispatch, method]);

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setProcessing(true);

      const authUser = await supabase.auth.getUser();
      const user = authUser.data?.user;

      if (!user) throw new Error("User not authenticated");

      const { error: purchaseError } = await supabase
        .from("purchase_history")
        .insert([
          {
            user_email: user.email,
            item: details.item,
            amount_paid:
              method === "crypto" ? details.cryptoPrice : details.usdPrice,
            payment_method: method,
            points:
              method === "crypto"
                ? Math.floor(details.cryptoPrice * details.rate * 0.05)
                : Math.floor(details.usdPrice * 0.05),
            status: "Completed",
            merchant_name: details.merchant_name,
          },
        ]);

      if (purchaseError) throw purchaseError;

      const rewardAmount = Math.floor(details.usdPrice * 0.05);

      const { error: rewardError } = await supabase
        .from("reward_history")
        .insert([
          {
            user_email: user.email,
            tokens: rewardAmount,
            source: "Purchase Cashback",
            note: `5% reward on ${details.item}`,
          },
        ]);

      if (rewardError) throw rewardError;

      setSuccess(true);
    } catch (err) {
      console.error("Payment failed:", err.message || err);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const goBack = () => {
    navigate("/checkout");
  };

  const buttonLabel =
    method === "crypto"
      ? `Pay ${details?.cryptoPrice?.toFixed(4)} ETH ($${(
          details?.cryptoPrice * details?.rate
        ).toFixed(4)}) Now`
      : `Pay $${details?.usdPrice} Now`;

  // if (Object.keys(details).length === 0)
  //   return <p className="text-white text-center">Loading...</p>;

  // const isLoadingDetails = !details || Object.keys(details).length === 0;
  // console.log(!details);
  // console.log(Object.keys(details).length === 0);
  // console.log(isLoadingDetails);
  if (true) {
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
              <span className="font-medium">Item:</span> {details?.item || "—"}
            </p>
            <p>
              <span className="font-medium">Quantity:</span> 1
            </p>
            <p>
              <span className="font-medium">Payment Method:</span> {method}
            </p>

            {method === "crypto" && (
              <div className="flex items-center justify-between">
                <label htmlFor="cryptoType" className="font-medium">
                  Crypto Type:
                </label>
                <select className="bg-blue-600 text-white px-3 py-2 rounded focus:outline-none">
                  <option className="text-black">ETH</option>
                  {/* <option className="text-black">BTC</option>
                  <option className="text-black">USDC</option> */}
                </select>
              </div>
            )}

            <p>
              <span className="font-medium">Price:</span>{" "}
              {method === "crypto"
                ? details?.cryptoPrice?.toFixed(4) +
                  "($" +
                  (details?.cryptoPrice * details?.rate).toFixed(4) +
                  ")"
                : "$" + details.usdPrice}
            </p>
            <p>
              <span className="font-medium">Fees:</span>{" "}
              {method === "crypto"
                ? (details?.cryptoPrice / 50).toFixed(4) +
                  ("  ($" +
                    ((details?.cryptoPrice * details?.rate) / 50).toFixed(4) +
                    ")")
                : "$" + (details?.usdPrice / 50).toFixed(4)}
            </p>
            {method === "crypto" && (
              <p>
                <span className="font-medium">Conversion:</span> 1 ETH ={" "}
                {"$" + details?.rate}
              </p>
            )}
            <p>
              <span className="font-medium">Rewards:</span> 5% cashback ={" "}
              {details?.usdPrice
                ? (details.usdPrice * 0.05).toFixed(4)
                : details?.cryptoPrice
                ? (details.cryptoPrice * 0.05).toFixed(4)
                : "0"}{" "}
              tokens
            </p>
            <p>
              <span className="font-medium">Discount:</span> {details?.discount}
              {"%"} off merchant discount
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handlePayment}
              disabled={!details || Object.keys(details).length === 0}
              className="w-full bg-sky-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-sky-300 transition"
            >
              {buttonLabel}
            </button>
            <button
              onClick={goBack}
              className="w-full border border-white/30 text-white py-2 rounded-lg hover:bg-white/10 transition"
            >
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
              <p className="mb-2 text-base">
                You paid{" "}
                {method === "crypto"
                  ? `${details?.cryptoPrice?.toFixed(4)} ${"ETH"} ($${
                      details?.cryptoPrice * details?.rate
                    })`
                  : `$${details?.usdPrice}`}
              </p>
              <h4 className="text-xl font-semibold text-green-300 mb-1">
                🎉 Congratulations!
              </h4>
              <p className="text-sm mb-1">
                You earned {(details?.usdPrice * 0.05).toFixed(2)} tokens as
                rewards
              </p>
              <p className="text-sm mb-4">Your new balance: 150 tokens</p>
              <button
                onClick={() => navigate("/dashboard")}
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
}
