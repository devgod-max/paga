import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import { Menu, X, UserCircle } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Checkout", path: "/checkout" },
  ];

  return (
    <header className="bg-black/30 backdrop-blur sticky top-0 z-50 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-3xl font-bold tracking-wide cursor-pointer text-cyan-300"
        >
          🚀 PAGA
        </h1>

        {/* Right Section: Nav Links then User Info */}
        <div className="hidden md:flex items-center gap-6">
          {/* Nav Links */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className="hover:underline"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="hover:underline text-red-300"
          >
            Logout
          </button>

          {/* User Info at the very right */}
          <div className="flex items-center gap-2 pl-4 border-l border-white/30 ml-4">
            <UserCircle size={22} className="text-cyan-300" />
            <span className="text-sm">{user?.email || "User"}</span>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <div className="pt-2 border-t border-white/20 text-sm text-white/70">
            Logged in as:{" "}
            <span className="font-medium text-white">{user?.email}</span>
          </div>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setMenuOpen(false);
                navigate(item.path);
              }}
              className="block w-full text-left text-white hover:underline"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="block w-full text-left text-red-300 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
