import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm/UserAuthForm";
import FeatureComboBox from "../../components/auth/FeatureComboBox";
import MobileTopIntro from "../../components/auth/MobileTopIntro";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn(!isSignIn);

  const features = [
    {
      title: "Smarter Payments.",
      content:
        "Streamlined checkout using modern payment tech for both fiat and crypto.",
    },
    {
      title: "Real Rewards.",
      content:
        "Get tangible rewards — cashback, tokens, or bonuses — with every transaction.",
    },
    {
      title: "No Wallet Needed.",
      content:
        "Skip setting up a crypto wallet. Just use your email to pay securely.",
    },
    {
      title: "Wallet optional.",
      content: "Use one if you want — or not. The rewards don’t change.",
    },
    {
      title: "Rewards guaranteed.",
      content: "Every eligible payment is rewarded. No tricks, just perks.",
    },
  ];

  return (
    <div className="relative h-full flex items-center justify-center px-4 py-4 overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl p-6 md:p-10 bg-[#282d38] bg-opacity-80 backdrop-blur-lg shadow-2xl">
        {/* Feature ComboBoxes – Left on desktop, Bottom on mobile */}
        <div className="order-2 md:order-1 flex flex-col space-y-4 bg-[#1e293b] rounded-2xl p-6 text-white text-lg font-medium">
          {features.map((feature, index) => (
            <FeatureComboBox
              key={index}
              title={feature.title}
              content={feature.content}
            />
          ))}
        </div>

        {/* AuthForm – Right on desktop, Top on mobile */}
        <div className="order-1 md:order-2 flex flex-col justify-center text-white">
          <div className="block md:hidden mb-6">
            <MobileTopIntro />
          </div>
          <h1 className="text-5xl text-font-extrabold leading-tight text-center">
            Smarter Payments,
            <br /> Real Rewards.
          </h1>
          <p className="text-center text-white/70 mt-2 text-xl">
            Start earning rewards with every checkout.
          </p>
          <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
}
