import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import Loader from "../../../Components/shared/Loader";

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
      if (role === "premium") {
        navigate("/dashboard/admin-dashboard");
      } else {
        navigate("/dashboard/ProfilePage");
      }
    }
  }, [user, role, isLoading, navigate]);

  return (
    <div className="flex justify-center items-center h-screen text-lg font-semibold">
      <Loader />
    </div>
  );
};

export default DashboardRedirect;
