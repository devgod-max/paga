import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  selectCard,
  selectBank,
  fetchCardAndBankData,
  saveNewCard,
  saveNewBank,
  resetCheckout,
  setPaymentMethod_1,
} from "../../redux/checkout/checkoutActions";

export default function PaymentSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { method_1, cards, banks, loading, registering, error } = useSelector(
    (state) => state.checkout
  );

  const [paymentMethod_2, setPaymentMethod_2] = useState(
    method_1 === "bank" ? "bank" : "card"
  );
  const [pendingCard, setPendingCard] = useState(null);
  const [pendingBank, setPendingBank] = useState(null);

  useEffect(() => {
    const user_id = JSON.parse(localStorage.getItem("authUser")).id;
    dispatch(fetchCardAndBankData(user_id));
    const method_1 = sessionStorage.getItem("method_1");
    dispatch(setPaymentMethod_1(method_1));
  }, [dispatch]);

  useEffect(() => {
    if (method_1 === "card" || method_1 === "bank") {
      setPaymentMethod_1(method_1);
    }
  }, [method_1]);

  const showMethodToggle = method_1 === "crypto";

  const [newCard, setNewCard] = useState({
    holder_name: "",
    number: "",
    exp_month: "",
    exp_year: "",
    brand: "",
  });

  const [newBank, setNewBank] = useState({
    holder_name: "",
    account_number: "",
    routing_number: "",
    bank_name: "",
  });

  const handleContinue = () => {
    if (paymentMethod_2 === "card" && pendingCard) {
      console.log(pendingCard);
      sessionStorage.setItem("method_2", pendingCard);
      dispatch(selectCard(pendingCard));
      alert(`Selected Card: ${pendingCard.brand} •••• ${pendingCard.last_4}`);
    } else if (paymentMethod_2 === "bank" && pendingBank) {
      sessionStorage.setItem("method_2", pendingBank);
      dispatch(selectBank(pendingBank));
      alert(
        `Selected Bank: ${pendingBank.bank_name} ${pendingBank.account_number}`
      );
    }
    navigate("/paymentsummary");
  };

  const handleCardRegister = async () => {
    const card = {
      card_id: `card_${Date.now()}`,
      brand: newCard.brand,
      last_4: newCard.number.slice(-4),
      exp_month: newCard.exp_month,
      exp_year: newCard.exp_year,
      holder_name: newCard.holder_name,
    };
    await dispatch(saveNewCard(card));
    setPendingCard(card);
    setNewCard({
      holder_name: "",
      number: "",
      exp_month: "",
      exp_year: "",
      brand: "",
    });
  };

  const handleBankRegister = async () => {
    const bank = {
      bank_id: `bank_${Date.now()}`,
      bank_name: newBank.bank_name,
      account_number: newBank.account_number.slice(-4),
      routing_number: newBank.routing_number,
      holder_name: newBank.holder_name,
    };
    await dispatch(saveNewBank(bank));
    setPendingBank(bank);
    setNewBank({
      holder_name: "",
      account_number: "",
      routing_number: "",
      bank_name: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-500 text-white">
        <p className="text-lg animate-pulse">Loading payment methods...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-blue-700 to-blue-500 px-4 py-10 flex flex-col items-center text-white">
      <h1 className="text-2xl font-bold mb-2">
        {method_1 === "crypto"
          ? "what do you prefer?"
          : method_1 === "card"
          ? "Choose your card or create new one"
          : "Choose your bank or create new one"}
      </h1>

      {showMethodToggle && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod_2("card")}
            className={`px-4 py-2 rounded-full ${
              paymentMethod_2 === "card"
                ? "bg-cyan-300 text-blue-900"
                : "bg-white/10 text-white"
            }`}
          >
            Card
          </button>
          <button
            onClick={() => setPaymentMethod_2("bank")}
            className={`px-4 py-2 rounded-full ${
              paymentMethod_2 === "bank"
                ? "bg-cyan-300 text-blue-900"
                : "bg-white/10 text-white"
            }`}
          >
            Bank
          </button>
        </div>
      )}

      <div className="space-y-4 w-full max-w-md">
        {paymentMethod_2 === "card" &&
          cards.map((card) => (
            <div
              key={card.card_id}
              onClick={() => setPendingCard(card)}
              className={`cursor-pointer rounded-lg border px-4 py-3 transition hover:bg-blue-600 ${
                pendingCard?.card_id === card.card_id
                  ? "bg-blue-600 border-white"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <p className="text-lg font-medium">
                {card.brand} •••• {card.last_4}
              </p>
              <p className="text-sm text-blue-200">
                Expires {card.exp_month}/{card.exp_year} — {card.holder_name}
              </p>
            </div>
          ))}

        {paymentMethod_2 === "bank" &&
          banks.map((bank) => (
            <div
              key={bank.bank_id}
              onClick={() => setPendingBank(bank)}
              className={`cursor-pointer rounded-lg border px-4 py-3 transition hover:bg-blue-600 ${
                pendingBank?.bank_id === bank.bank_id
                  ? "bg-blue-600 border-white"
                  : "bg-white/10 border-white/20"
              }`}
            >
              <p className="text-lg font-medium">
                {bank.bank_name} — •••• {bank.account_number}
              </p>
              <p className="text-sm text-blue-200">
                Routing: {bank.routing_number} — {bank.holder_name}
              </p>
            </div>
          ))}

        <button
          onClick={handleContinue}
          disabled={paymentMethod_2 === "card" ? !pendingCard : !pendingBank}
          className={`w-full mt-2 font-semibold py-2 rounded-lg transition ${
            (paymentMethod_2 === "card" && pendingCard) ||
            (paymentMethod_2 === "bank" && pendingBank)
              ? "bg-cyan-300 text-blue-900 hover:bg-cyan-200"
              : "bg-white/20 text-white/50 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Register New {paymentMethod_2 === "card" ? "Card" : "Bank Account"}
          </h2>

          {paymentMethod_2 === "card" ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name on Card"
                value={newCard.holder_name}
                onChange={(e) =>
                  setNewCard({ ...newCard, holder_name: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  value={newCard.exp_month}
                  onChange={(e) =>
                    setNewCard({ ...newCard, exp_month: e.target.value })
                  }
                  className="w-1/2 px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="YY"
                  value={newCard.exp_year}
                  onChange={(e) =>
                    setNewCard({ ...newCard, exp_year: e.target.value })
                  }
                  className="w-1/2 px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
                />
              </div>
              <input
                type="text"
                placeholder="Brand (Visa, MasterCard)"
                value={newCard.brand}
                onChange={(e) =>
                  setNewCard({ ...newCard, brand: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCardRegister}
                disabled={registering}
                className={`w-full font-semibold py-2 rounded-lg transition ${
                  registering
                    ? "bg-white/20 text-white/50 cursor-not-allowed"
                    : "bg-cyan-300 text-blue-900 hover:bg-cyan-200"
                }`}
              >
                {registering ? "Registering..." : "Register Card"}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Account Holder Name"
                value={newBank.holder_name}
                onChange={(e) =>
                  setNewBank({ ...newBank, holder_name: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={newBank.account_number}
                onChange={(e) =>
                  setNewBank({ ...newBank, account_number: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Routing Number"
                value={newBank.routing_number}
                onChange={(e) =>
                  setNewBank({ ...newBank, routing_number: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Bank Name"
                value={newBank.bank_name}
                onChange={(e) =>
                  setNewBank({ ...newBank, bank_name: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/10 placeholder-white/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleBankRegister}
                disabled={registering}
                className={`w-full font-semibold py-2 rounded-lg transition ${
                  registering
                    ? "bg-white/20 text-white/50 cursor-not-allowed"
                    : "bg-cyan-300 text-blue-900 hover:bg-cyan-200"
                }`}
              >
                {registering ? "Registering..." : "Register Bank Account"}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={async () => {
            dispatch(resetCheckout());
            navigate("/checkout");
          }}
          className="mt-6 w-full py-2 bg-white/20 text-white hover:bg-white/30 rounded-lg"
        >
          Back to Payment Selection Page
        </button>
      </div>
    </div>
  );
}
