import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute({ user }) {
  const role = user?.user_metadata?.role;

  if (user) {
    // Redirect based on role
    return (
      <Navigate
        to={role === "merchant" ? "/merchant/dashboard" : "/checkout"}
        replace
      />
    );
  }

  return <Outlet />;
}

export function UserRoute({ user }) {
  if (!user) return <Navigate to="/" replace />;
  const role = user?.user_metadata?.role;
  return role === "user" ? <Outlet /> : <Navigate to="/" replace />;
}

export function MerchantRoute({ user }) {
  if (!user) return <Navigate to="/merchant" replace />;
  const role = user?.user_metadata?.role;
  return role === "merchant" ? <Outlet /> : <Navigate to="/merchant" replace />;
}
