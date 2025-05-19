import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AuthNavbar({ role = "user", children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isUser = role === "user";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
      {/* Navbar */}
      <header className="bg-black/30 backdrop-blur sticky top-0 z-50 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-3xl font-bold tracking-wide cursor-pointer text-cyan-300"
          >
            🚀 PAGA
          </h1>

          {/* Desktop Switch Link */}
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg shadow text-sm font-medium text-white">
            {isUser ? (
              <>
                <span>Are you a merchant?</span>
                <button
                  onClick={() => navigate("/merchant")}
                  className="text-cyan-300 hover:underline"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                <span>Are you a customer?</span>
                <button
                  onClick={() => navigate("/")}
                  className="text-cyan-300 hover:underline"
                >
                  Login here
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Switch */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 text-sm">
            {isUser ? (
              <>
                Are you a merchant?{" "}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/merchant");
                  }}
                  className="text-blue-200 hover:underline font-medium"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Are you a customer?{" "}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="text-blue-200 hover:underline font-medium"
                >
                  Login here
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Auth page content */}
      <main className="w-full">{children}</main>
    </div>
  );
}
