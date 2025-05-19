import Navbar from "../components/common/NavBar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-700 text-white">
      <Navbar />
      <main className="px-4 py-10 md:px-12">{children}</main>
    </div>
  );
}
