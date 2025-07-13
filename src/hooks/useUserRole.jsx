// hooks/useUserRole.js
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios"; // secure axios instance

const useUserRole = (email) => {
  const axiosSecure = useAxios();

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data?.role; // should return "user" or "admin"
    },
    enabled: !!email,
  });

  return { role, isLoading };
};

export default useUserRole;
