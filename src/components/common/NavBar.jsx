import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import store from "../../redux/store";
import { logout } from "../../redux/auth/actions";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    store.dispatch(logout());
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="bg-black/30 backdrop-blur sticky top-0 z-50 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1
          className="text-3xl font-bold tracking-wide cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          🚀 PAGA
        </h1>
        <nav className="space-x-6 hidden md:block">
          <button
            onClick={() => navigate("/dashboard")}
            className="hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="hover:underline"
          >
            Checkout
          </button>
          <button
            onClick={handleLogout}
            className="hover:underline text-red-300"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
