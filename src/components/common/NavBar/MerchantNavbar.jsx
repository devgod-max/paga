import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../../supabaseClient";
import store from "../../../redux/store";
import { logout } from "../../../redux/auth/actions";

export default function MerchantNavbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

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
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>

          {/* User Info */}
          {user && (
            <div className="pl-4 border-l text-sm text-gray-600 truncate max-w-[200px]">
              {user.email}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
