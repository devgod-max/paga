import UserNavbar from "../components/common/NavBar/UserNavBar";
import MerchantNavbar from "../components/common/NavBar/MerchantNavbar";

export default function MainLayout({ children, role = "user" }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-700 text-white">
      {role === "user" ? <UserNavbar /> : <MerchantNavbar />}
      <main className="px-4 py-10 md:px-12">{children}</main>
    </div>
  );
}
