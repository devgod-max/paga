import { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { login, signup } from "../../../redux/auth/actions"; // Correctly import signup and login actions

export default function AuthForm({ isSignIn, toggleForm }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      dispatch(login(email, password)); // Dispatch login action
    } else {
      if (password === confirmPassword) {
        dispatch(signup(email, username, "user", password)); // Dispatch signup action
      } else {
        alert("Passwords do not match.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white"
          placeholder="you@example.com"
        />
      </div>
      {!isSignIn && (
        <div>
          <label className="block text-sm mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white"
            placeholder="John Doe"
          />
        </div>
      )}
      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/30 text-white"
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
            className="w-full px-4 py-2 rounded-lg bg-white/30 text-white"
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
              onClick={toggleForm}
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
              onClick={toggleForm}
              className="text-cyan-300 hover:underline font-medium"
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </form>
  );
}
