import UserNavbar from "../components/common/NavBar/UserNavBar";
import MerchantNavbar from "../components/common/NavBar/MerchantNavbar";

export default function MainLayout({ children, role = "user" }) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-700 text-white">
      {/* Navbar - 10% of height */}
      <div className="basis-[10%] flex-shrink-0">
        {role === "user" ? <UserNavbar /> : <MerchantNavbar />}
      </div>

      {/* Main content - 90% of height */}
      <main className="basis-[90%] px-4 py-10 md:px-12 overflow-auto">
        {children}
      </main>
    </div>
  );
}
