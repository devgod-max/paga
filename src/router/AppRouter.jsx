import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Auth from "../pages/Auth/UserAuth";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/Dashboard/UserDashboard";
import MainLayout from "../layouts/MainLayout";
import PaymentSummary from "../pages/PaymentSummary";
import MerchantAuth from "../pages/Auth/MerchantAuth";
import MerchantDashboard from "../pages/Dashboard/MerchantDashboard";
import AuthNavbar from "../components/common/NavBar/AuthNavBar";

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
      setInitialCheckDone(true);
    };
    getUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    if (!initialCheckDone) return;

    const isUserAuthPage = location.pathname === "/";
    const isMerchantAuthPage = location.pathname === "/merchant";

    const publicPaths = ["/", "/merchant"];

    // If not logged in and not on a public page, redirect to login
    if (!user && !publicPaths.includes(location.pathname)) {
      navigate("/", { replace: true });
      return;
    }

    // If logged in and on an auth page, redirect to appropriate dashboard
    if (user && (isUserAuthPage || isMerchantAuthPage)) {
      const authUserStr = localStorage.getItem("authUser");

      try {
        if (authUserStr) {
          const authUser = JSON.parse(authUserStr);
          const storedRole = authUser?.user_metadata?.role;

          console.log(storedRole);

          if (storedRole === "merchant") {
            navigate("/merchant/dashboard", { replace: true });
          } else {
            navigate("/checkout", { replace: true });
          }
        } else {
          // Fallback: redirect to /checkout or merchant dashboard using default
          navigate("/checkout", { replace: true });
        }
      } catch (err) {
        console.error("Error parsing authUser:", err);
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate, location.pathname, initialCheckDone]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthNavbar role="user">
            <Auth />
          </AuthNavbar>
        }
      />
      <Route
        path="/merchant/"
        element={
          <AuthNavbar role="merchant">
            <MerchantAuth />
          </AuthNavbar>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/merchant/dashboard"
        element={
          <MainLayout role="merchant">
            <MerchantDashboard />
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
    </Routes>
  );
}
