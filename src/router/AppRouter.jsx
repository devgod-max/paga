import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import Auth from "../pages/Auth/UserAuth";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/Dashboard/UserDashboard";
import MainLayout from "../layouts/MainLayout";
import PaymentSummary from "../pages/PaymentSummary";
import MerchantAuth from "../pages/Auth/MerchantAuth";

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

    const isAuthPage = location.pathname === "/";

    const publicPaths = ["/", "/merchant"];

    if (!user && !publicPaths.includes(location.pathname)) {
      navigate("/", { replace: true });
    }

    if (user && isAuthPage) {
      const storedRole = localStorage.getItem("role");

      if (storedRole === "merchant") {
        navigate("/merchant/dashboard", { replace: true });
      } else {
        navigate("/checkout", { replace: true });
      }
    }
  }, [user, navigate, location.pathname, initialCheckDone]);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/merchant/" element={<MerchantAuth />} />
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
    </Routes>
  );
}
