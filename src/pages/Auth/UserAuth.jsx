import { useState } from "react";
import AuthForm from "../../components/auth/AuthForm/UserAuthForm";
import FeatureList from "../../components/auth/FeatureList";
import MobileTopIntro from "../../components/auth/MobileTopIntro";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleForm = () => setIsSignIn(!isSignIn);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-5xl font-bold text-white">Customer Account</h1>

          {/* Main feature section */}
          <FeatureList />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="block md:hidden">
            <MobileTopIntro />
          </div>

          <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
        </div>
      </div>
    </div>
  );
}
