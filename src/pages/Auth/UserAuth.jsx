import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm/UserAuthForm";
import FeatureComboBox from "../../components/auth/FeatureComboBox";
import MobileTopIntro from "../../components/auth/MobileTopIntro";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn(!isSignIn);

  return (
    <div className="w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl p-6 md:p-10 bg-[#282d38] bg-opacity-80 backdrop-blur-lg shadow-2xl">
        {/* Feature ComboBoxes – Left on desktop, Bottom on mobile */}
        <div className="order-2 md:order-1 flex flex-col space-y-4 bg-[#1e293b] rounded-2xl p-6 text-white text-lg font-medium">
          <FeatureComboBox
            title="Pay with Crypto—No Wallet"
            content="Use crypto without managing a wallet. Just email and pay."
          />
          <FeatureComboBox
            title="Crypto Payments Made Simple"
            content="No complicated steps. Just select, pay, done."
          />
          <FeatureComboBox
            title="Buy Crypto with just your email"
            content="No registration or wallets needed—just email access."
          />
          <FeatureComboBox
            title="No wallet Setup, Instantly"
            content="Forget wallet apps. Get started with zero friction."
          />
          <FeatureComboBox
            title="Get Crypto Fast – No Wallet"
            content="Receive crypto access fast without setup or download."
          />
        </div>

        {/* AuthForm – Right on desktop, Top on mobile */}
        <div className="order-1 md:order-2 flex flex-col justify-center text-white">
          <div className="block md:hidden mb-6">
            <MobileTopIntro />
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-center">
            Smarter Payments,
            <br /> Real Rewards.
          </h1>
          <p className="text-center text-white/70 mt-2 text-sm">
            No crypto wallet required. Pay with crypto, card, or bank using just
            your email.
          </p>
          <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
}
