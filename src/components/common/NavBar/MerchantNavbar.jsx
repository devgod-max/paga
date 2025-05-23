import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import { Sun, Moon, UserCircle, Search, CircleDot } from "lucide-react";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
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

        {/* Search bar */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md flex items-center bg-white border border-black rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <Search size={16} className="text-black" />
          </div>
        </div>

        {/* Right Side: Theme Toggle + User Dropdown */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle pill */}
          <div className="bg-gray-200 rounded-full px-1 py-1 flex items-center">
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
          </div>

          {/* User info + dropdown */}
          <div className="relative">
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
                className="absolute right-0 mt-2 w-40 bg-white text-black border border-gray-300 rounded-lg p-2 shadow"
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
        </div>
      </div>
    </header>
  );
}
