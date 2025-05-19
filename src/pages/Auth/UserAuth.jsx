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
        {/* Left - Feature List */}
        <FeatureList />

        {/* Mobile - Top Intro */}
        <MobileTopIntro />

        {/* Right - Auth Form */}
        <AuthForm isSignIn={isSignIn} toggleForm={toggleForm} />
      </div>
    </div>
  );
}
