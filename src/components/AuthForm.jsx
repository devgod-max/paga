import { useState } from "react";

export default function AuthLanding() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 font-sans text-white px-4 py-12 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left - Feature List */}
        <div className="space-y-6 md:block hidden">
          <h1 className="text-4xl font-bold leading-tight">
            Smarter payments. Real rewards.
          </h1>
          <p className="text-lg text-gray-100">
            No crypto wallet required. Pay with crypto, card, or bank using just
            your email.
          </p>
          <ul className="space-y-4 text-white text-base">
            <li>➤ Pay with Crypto — No Wallet</li>
            <li>➤ Crypto Payments Made Simple</li>
            <li>➤ Buy Crypto with Just Your Email</li>
            <li>➤ No Wallet Setup, Pay Instantly</li>
            <li>➤ Get Crypto Fast — No Wallet</li>
          </ul>
        </div>

        {/* Mobile - Top Intro */}
        <div className="md:hidden text-center mb-8">
          <h1 className="text-3xl font-bold">
            Smarter payments. Real rewards.
          </h1>
          <p className="text-base text-gray-100 mt-2">
            No crypto wallet required. Pay with crypto, card, or bank using just
            your email.
          </p>
        </div>

        {/* Right - Auth Form */}
        <div className="bg-white/20 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-2xl w-full text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
            {isSignIn ? "Sign in to your account" : "Create a new account"}
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-sm mb-1">Email or Username</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-white hover:text-cyan-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {!isSignIn && (
              <div>
                <label className="block text-sm mb-1">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="••••••••"
                />
              </div>
            )}
            <button className="w-full bg-cyan-300 text-blue-900 font-semibold py-2 rounded-lg hover:bg-cyan-200 transition">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <div className="text-center text-sm text-gray-200">Or</div>
            <button className="w-full border border-white/40 flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-white/10">
              <span className="text-lg">G</span> Continue with Google
            </button>
            <div className="text-center text-sm text-gray-100">
              {isSignIn ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignIn(false)}
                    className="text-cyan-300 hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignIn(true)}
                    className="text-cyan-300 hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
