import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const { user, loading } = useContext(AuthContext);
  const userRole = user?.role || "normal"; // fallback role
  return { user, loading, userRole };
};
