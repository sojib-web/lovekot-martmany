import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";

const DashboardRedirect = () => {
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!isLoading) {
      if (role === "admin") {
        navigate("/dashboard/admin-dashboard");
      } else {
        navigate("/dashboard/edit-biodata");
      }
    }
  }, [user, role, isLoading, navigate]);

  return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold">
      ড্যাশবোর্ড লোড হচ্ছে...
    </div>
  );
};

export default DashboardRedirect;
