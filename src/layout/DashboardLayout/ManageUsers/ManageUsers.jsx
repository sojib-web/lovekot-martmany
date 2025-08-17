// @ts-nocheck
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import Pagination from "../../../Components/Pagination/Pagination";
import Loader from "../../../Components/shared/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // প্রতি পেজে কত রেকর্ড দেখাবে
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users with pagination and search
  const { data, isLoading, isError } = useQuery({
    queryKey: ["manage-users", page, searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { page, limit, search: searchTerm },
      });
      return res.data;
      // expect response structure: { data: [...users], totalPages, page, total }
    },
    keepPreviousData: true,
  });

  const makeAdminMutation = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/${userId}/make-admin`),
    onSuccess: () => {
      Swal.fire("Success", "User is now an Admin", "success");
      queryClient.invalidateQueries({ queryKey: ["manage-users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to make user admin", "error");
    },
  });

  const makePremiumMutation = useMutation({
    mutationFn: (userId) => axiosSecure.patch(`/users/${userId}/make-premium`),
    onSuccess: () => {
      Swal.fire("Success", "User is now Premium", "success");
      queryClient.invalidateQueries({ queryKey: ["manage-users"] });
    },
    onError: () => {
      Swal.fire("Error", "Failed to make user premium", "error");
    },
  });

  const handleMakeAdmin = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make this user an Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
      }
    });
  };

  const handleMakePremium = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make this user Premium?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Premium",
    }).then((result) => {
      if (result.isConfirmed) {
        makePremiumMutation.mutate(userId);
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-center text-gray-500">
        <Loader />
      </p>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error loading users.</p>;
  }

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        Manage Users
      </h1>

      {/* Search input */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // search term change করলে page 1 এ reset হবে
          }}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-600 focus:border-rose-600 transition"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm text-gray-100 bg-gradient-to-r from-rose-600 to-amber-500">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wide">#</th>
              <th className="px-6 py-4 font-semibold tracking-wide">
                User Name
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide">Email</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-center">
                Make Admin
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide text-center">
                Make Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500 italic font-medium"
                >
                  No users found.
                </td>
              </tr>
            )}

            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b hover:bg-rose-50 transition duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">
                  {(page - 1) * limit + index + 1}
                </td>
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 text-center">
                  {user.role === "admin" ? (
                    <span className="text-green-600 font-semibold">Admin</span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      disabled={makeAdminMutation.isLoading}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-1.5 rounded-full shadow-sm transition disabled:opacity-50"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {user.premiumRequested ? (
                    user.role === "premium" ? (
                      <span className="text-yellow-600 font-semibold">
                        Premium
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakePremium(user._id)}
                        disabled={makePremiumMutation.isLoading}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-full shadow-sm transition disabled:opacity-50"
                      >
                        Make Premium
                      </button>
                    )
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ManageUsers;
