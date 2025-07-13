import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-neutral"></span>
      </div>
    );
  }

  // 1️⃣ Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2️⃣ Logged in, but not admin → redirect to forbidden
  if (role !== "admin") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  // 3️⃣ Authorized admin → allow access
  return children;
};

export default AdminRoute;
