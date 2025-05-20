import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Auth from "../pages/Auth/UserAuth";
import MerchantAuth from "../pages/Auth/MerchantAuth";
import Dashboard from "../pages/Dashboard/UserDashboard";
import MerchantDashboard from "../pages/Dashboard/MerchantDashboard";
import Checkout from "../pages/Checkout";
import PaymentSummary from "../pages/PaymentSummary";
import MainLayout from "../layouts/MainLayout";
import AuthNavbar from "../components/common/NavBar/AuthNavBar";
import { PublicRoute, UserRoute, MerchantRoute } from "./ProtectedRoute";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const init = async () => {
    //   const { data: sessionData } = await supabase.auth.getSession();
    //   const sessionUser = sessionData?.session?.user;
    //   if (sessionUser) {
    //     setUser(sessionUser);
    //   }
    //   supabase.auth.onAuthStateChange((_event, session) => {
    //     console.log(session);
    //     setUser(session?.user || null);
    //   });
    //   setLoading(false);
    // };
    // init();
    const user = JSON.parse(localStorage.getItem("authUser"));
    setUser(user);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoute user={user} />}>
        <Route
          path="/"
          element={
            <AuthNavbar role="user">
              <Auth />
            </AuthNavbar>
          }
        />
        <Route
          path="/merchant"
          element={
            <AuthNavbar role="merchant">
              <MerchantAuth />
            </AuthNavbar>
          }
        />
      </Route>

      {/* USER ROUTES */}
      <Route element={<UserRoute user={user} />}>
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <Checkout />
            </MainLayout>
          }
        />
        <Route
          path="/paymentsummary"
          element={
            <MainLayout>
              <PaymentSummary />
            </MainLayout>
          }
        />
      </Route>

      {/* MERCHANT ROUTES */}
      <Route element={<MerchantRoute user={user} />}>
        <Route
          path="/merchant/dashboard"
          element={
            <MainLayout role="merchant">
              <MerchantDashboard />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  );
}
