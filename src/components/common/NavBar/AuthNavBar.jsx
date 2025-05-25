import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AuthNavbar({ role = "user", children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const isUser = role === "user";

  return (
    <div
      className="w-full flex flex-col bg-cover bg-center items-center justify-center backdrop-blur-sm text-white"
      style={{ backgroundImage: "url('./assets/bg.png')" }}
    >
      {/* Header */}
      <header className="w-full shadow-sm border-b border-white/10 sticky top-0 z-50 bg-black/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold cursor-pointer"
          >
            🚀 PAGA
          </h1>

          {/* Desktop Switch Link */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
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
            className="md:hidden text-white/70"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 py-2 text-sm border-t border-white/10 bg-black/60">
            {isUser ? (
              <p>
                Are you a merchant?{" "}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/merchant");
                  }}
                  className="text-cyan-300 hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            ) : (
              <p>
                Are you a customer?{" "}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="text-cyan-300 hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1 w-full flex items-center justify-center px-4 py-0">
        {children}
      </main>
    </div>
  );
}
