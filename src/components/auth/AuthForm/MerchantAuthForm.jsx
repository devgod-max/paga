import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../../redux/auth/actions"; // Assuming these handle Supabase logic internally

export default function MerchantAuthForm() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleForm = () => setIsSignIn(!isSignIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      await dispatch(login(email, password, "merchant", navigate)); // Optional: pass role or navigate
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      await dispatch(signup(email, username, "merchant", password, navigate)); // Reuse logic but pass "merchant"
    }

    const user = JSON.parse(localStorage.getItem("authUser"));

    if (user?.user_metadata?.role === "merchant") {
      // If the user is a merchant, navigate to the merchant dashboard
      navigate("/merchant/dashboard");
      window.location.reload();
    } else {
      console.log("alert");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 w-full max-w-md mx-auto text-black"
    >
      <h2 className="text-xl font-bold text-center">
        {isSignIn
          ? "Sign in to your merchant account"
          : "Create merchant account"}
      </h2>

      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          placeholder="merchant@example.com"
        />
      </div>

      {!isSignIn && (
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
            placeholder="Business Name"
          />
        </div>
      )}

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border"
          placeholder="••••••••"
        />
      </div>

      {!isSignIn && (
        <div>
          <label className="block text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border"
            placeholder="••••••••"
          />
        </div>
      )}

      <button className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition">
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>

      <div className="text-center text-sm text-gray-600">Or</div>

      <button
        type="button"
        className="w-full border border-gray-400 flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <span className="text-lg">G</span> Continue with Google
      </button>

      <div className="text-center text-sm text-gray-700">
        {isSignIn ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              onClick={toggleForm}
              className="text-blue-600 hover:underline font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </form>
  );
}
