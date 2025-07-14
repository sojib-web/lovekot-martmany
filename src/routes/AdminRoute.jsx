// src/routes/AdminRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loader from "../Components/shared/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, loading: roleLoading } = useUserRole(user?.email); // ✅ Pass email
  const location = useLocation();

  if (loading || roleLoading) return <Loader />;

  if (!user?.email) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== "premium") {
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
