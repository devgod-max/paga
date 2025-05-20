import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";
import { UserCircle } from "lucide-react";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
    window.location.reload();
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown when clicked outside
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-gray-800">
        {/* Logo */}
        <h1
          onClick={() => navigate("/merchant/dashboard")}
          className="text-2xl font-semibold tracking-tight cursor-pointer"
        >
          Paga Merchant
        </h1>

        {/* Nav Links + User */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate("/merchant/dashboard")}
            className="text-sm hover:text-blue-600"
          >
            Dashboard
          </button>
          <div className="relative">
            {/* User Info and Dropdown Toggle */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
              className="flex items-center gap-2 cursor-pointer pl-4 border-l text-sm text-gray-600"
            >
              <UserCircle size={22} className="text-cyan-300" />
              <span className="truncate">{user?.email}</span>
            </div>

            {/* Simplified Dropdown Menu */}
            {dropdownOpen && (
              <div
                ref={dropdownRef} // Attach the ref to the dropdown
                className="absolute right-0 mt-2 w-40 bg-white text-black border border-gray-300 rounded-lg p-2"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-black-500 hover:bg-gray-100 rounded-b-lg"
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
