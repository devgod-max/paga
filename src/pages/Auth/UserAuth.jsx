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
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 rounded-[30px] p-3 md:p-6 bg-[#ffffff] bg-opacity-10 backdrop-blur-lg shadow-2xl">
        {/* Feature ComboBoxes – Left on desktop, Bottom on mobile */}
        <div className="w-[90%] mx-auto md:mx-0 order-2 md:order-1 flex flex-col space-y-6 bg-[#ffffff] bg-opacity-10 rounded-[20px] p-6 text-white text-lg font-medium">
          {features.map((feature, index) => (
            <FeatureComboBox
              key={index}
              title={feature.title}
              content={feature.content}
            />
          ))}
        </div>

        {/* AuthForm – Right on desktop, Top on mobile */}
        <div className="w-[100%] order-1 md:order-2 flex flex-col justify-center text-white my-7">
          <div className="block md:hidden mb-6"></div>
          <div class="font-grifter font-bold text-[56px] leading-[100%] text-[#F2F2F2] text-center">
            Smarter Payments,
            <br /> Real Rewards.
          </div>
          <p className="text-center text-[#F2F2F2] text-[18px] text-opacity-80 mt-2">
            Start earning rewards with every checkout.
          </p>
          <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
}
