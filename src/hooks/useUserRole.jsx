// hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"; // your secure axios instance

const useUserRole = (email) => {
  const axiosSecure = useAxios();

  console.log("📧 useUserRole called with:", email);

  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/role/${email.toLowerCase()}`);
        console.log("✅ Fetched role:", res.data);
        return res.data?.role || "user";
      } catch (err) {
        console.error("❌ Error fetching user role:", err);
        return "user";
      }
    },
  });

  console.log("🚦 Final role:", role);

  return { role, isLoading };
};

export default useUserRole;
