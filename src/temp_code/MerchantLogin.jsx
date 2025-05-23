import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function MerchantAuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toggleForm = () => setIsSignIn(!isSignIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isSignIn ? "Signed in as" : "Signed up as"} ${email}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 text-white bg-gray-800">
      <div className="w-full max-w-md text-center mb-8">
        <h1 className="text-4xl font-extrabold leading-snug md:text-5xl">
          Smarter Payments,
          <br className="hidden md:inline" /> Real Rewards.
        </h1>
      </div>

      <div className="w-full max-w-md space-y-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6 rounded-3xl bg-[#0f172a]/80 border border-white/10 shadow-xl"
        >
          <button
            type="button"
            className="w-full border border-black rounded-full py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign In with Google
          </button>

          <div className="flex items-center space-x-4 text-sm text-white/60">
            <div className="flex-1 border-t border-white/20" />
            <span>OR</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          <h2 className="text-center text-lg font-bold">
            Sign in to your account
          </h2>

          <div className="relative">
            <Mail className="absolute left-4 top-3 text-white/50" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              className="w-full pl-12 py-3 rounded-2xl bg-white/10 text-white placeholder-white/50 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3 text-white/50" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 rounded-2xl bg-white/10 text-white placeholder-white/50 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-white/50"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isSignIn && (
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-2xl bg-white/10 text-white placeholder-white/50 focus:outline-none"
            />
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-between px-6 py-3 bg-white text-[#0f172a] font-semibold rounded-full hover:bg-gray-100 transition"
          >
            <span className="mx-auto">{isSignIn ? "Sign In" : "Sign Up"}</span>
            <ArrowRight className="ml-auto" size={18} />
          </button>

          <p className="text-sm text-center text-white/70">
            {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-400 hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
