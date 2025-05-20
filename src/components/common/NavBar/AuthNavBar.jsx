import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AuthNavbar({ role = "user", children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isUser = role === "user";

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
      {/* Navbar - 10% of screen */}
      <header className="basis-[10%] flex-shrink-0 bg-black/30 backdrop-blur z-50 shadow-md flex items-center">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center w-full">
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
      </header>

      {/* Mobile Switch (not fixed, just flows below header) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-2 space-y-2 text-sm bg-black/30">
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

      {/* Content - takes remaining 90% */}
      <main className="basis-[90%] overflow-auto w-full">{children}</main>
    </div>
  );
}
