import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../../redux/auth/actions";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function MerchantAuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleForm = () => setIsSignIn(!isSignIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      await dispatch(login(email, password, "merchant", navigate));
      navigate("/merchant/dashboard");
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      await dispatch(signup(email, username, "merchant", password, navigate));
      navigate("/merchant/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full max-w-md mx-auto text-white px-4 py-4"
    >
      <h1 className="text-4xl font-extrabold text-center leading-tight">
        Smarter Payments,
        <br className="hidden sm:inline" /> Real Rewards.
      </h1>

      <button
        type="button"
        className="w-full border border-white/30 rounded-full py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-white/10 transition"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Sign In with Google
      </button>

      <div className="flex items-center gap-4 text-sm text-white/50">
        <div className="flex-1 border-t border-white/20" />
        <span>OR</span>
        <div className="flex-1 border-t border-white/20" />
      </div>

      <h2 className="text-center text-md font-semibold">
        {isSignIn ? "Sign in to your account" : "Create merchant account"}
      </h2>

      <div className="relative">
        <Mail className="absolute left-4 top-3 text-white/50" size={18} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Username"
          className="w-full bg-white/10 text-white pl-12 pr-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {!isSignIn && (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Business Name"
          className="w-full bg-white/10 text-white px-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      )}

      <div className="relative">
        <Lock className="absolute left-4 top-3 text-white/50" size={18} />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-white/10 text-white pl-12 pr-10 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <button
          type="button"
          className="absolute right-4 top-3 text-white/50"
          onClick={() => setShowPassword(!showPassword)}
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
          className="w-full bg-white/10 text-white px-4 py-3 rounded-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition"
      >
        <span>{isSignIn ? "Sign In" : "Sign Up"}</span>
        <ArrowRight size={18} />
      </button>

      <p className="text-sm text-center text-white/60">
        {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-cyan-300 hover:underline font-medium"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </form>
  );
}
