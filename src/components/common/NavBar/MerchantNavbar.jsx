import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import {
  Sun,
  Moon,
  UserCircle,
  Search,
  CircleDot,
  Menu,
  X,
} from "lucide-react";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border border-gray-200 rounded-full p-2 px-4 shadow-sm mt-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center">
          <button onClick={() => navigate("/merchant/dashboard")}>
            <CircleDot className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Search - Desktop only */}
        <div className="ml-auto hidden md:flex items-center justify-end">
          <div className="w-full max-w-md flex items-center bg-white border border-black rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Search size={10} className="text-black" />
          </div>
        </div>

        {/* Right: Darkmode, User, Hamburger */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle - hidden on mobile */}
          {/* <div className="bg-gray-200 rounded-full px-1 py-1 hidden md:flex items-center">
            <button
              className={`p-1 rounded-full ${
                !darkMode ? "bg-black text-white" : "text-gray-400"
              }`}
              onClick={() => setDarkMode(false)}
            >
              <Sun size={18} />
            </button>
            <button
              className={`p-1 rounded-full ${
                darkMode ? "bg-black text-white" : "text-gray-400"
              }`}
              onClick={() => setDarkMode(true)}
            >
              <Moon size={18} />
            </button>
          </div> */}

          {/* User Dropdown - desktop only */}
          <div className="relative hidden md:block">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer text-sm text-gray-600"
            >
              <UserCircle size={22} className="text-cyan-400" />
              <span className="truncate max-w-[120px]">{user?.email}</span>
            </div>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-40 bg-white text-black border border-gray-300 rounded-lg p-2 shadow z-50"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white border border-gray-200 rounded-lg p-4 shadow text-sm space-y-2">
          <button
            onClick={() => navigate("/merchant/dashboard")}
            className="block w-full text-left py-2 hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
