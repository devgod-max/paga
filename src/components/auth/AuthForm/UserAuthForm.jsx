import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../../../redux/auth/actions";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AuthForm({ isSignIn, toggleForm }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      await dispatch(login(email, password, "user"));
      navigate("/checkout");
    } else {
      if (password === confirmPassword) {
        await dispatch(signup(email, username, "user", password));
        navigate("/checkout");
      } else {
        alert("Passwords do not match.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 mt-6">
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

      <div className="flex items-center gap-4 text-sm text-gray-400">
        <div className="flex-1 border-t border-gray-300" />
        <span>OR</span>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      <h2 className="text-md font-semibold text-center">
        {isSignIn ? "Sign in to your account" : "Create your account"}
      </h2>

      <div className="relative">
        <Mail className="absolute left-4 top-3 text-gray-400" size={18} />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Username"
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {!isSignIn && (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      <div className="relative">
        <Lock className="absolute left-4 top-3 text-gray-400" size={18} />
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="button"
          className="absolute right-4 top-3 text-gray-400"
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
          className="w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-400 text-white font-semibold rounded-full hover:bg-emerald-500 transition"
      >
        <span>{isSignIn ? "Sign In" : "Sign Up"}</span>
        <ArrowRight size={18} />
      </button>

      <p className="text-sm text-center text-gray-500">
        {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={toggleForm}
          className="text-blue-500 hover:underline font-medium"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </form>
  );
}
