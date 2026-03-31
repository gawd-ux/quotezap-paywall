import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// 🔐 Require logged in user
export function RequireAuth() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// 💰 TEMP: disable subscription check (dev mode)
export function RequireSubscription() {
  return <Outlet />;
}

// 🚫 Prevent logged-in users from seeing login/register
export function PublicOnly() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}