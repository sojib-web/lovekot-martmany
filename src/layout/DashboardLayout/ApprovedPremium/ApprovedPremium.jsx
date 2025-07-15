// @ts-nocheck
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import Pagination from "../../../Components/Pagination/Pagination";

const ApprovedPremium = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // প্রতি পেজে কত রেকর্ড দেখাবে

  // Fetch all premium approval requests with pagination
  const { data, isLoading, isError } = useQuery({
    queryKey: ["approved-premium-requests", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/approvedPremium", {
        params: { page, limit },
      });
      console.log("📦 Approved Premium Fetched Users:", res.data);
      return res.data; // structure: { data: [...users], totalPages, page, total }
    },
    keepPreviousData: true,
  });

  // Mutation to make user premium
  const makePremiumMutation = useMutation({
    mutationFn: (userId) => {
      console.log("🚀 Sending PATCH request to make premium for:", userId);
      return axiosSecure.patch(`/users/${userId}/make-premium`);
    },
    onSuccess: () => {
      console.log("✅ User made premium successfully");
      Swal.fire("Success", "User is now Premium", "success");
      queryClient.invalidateQueries({
        queryKey: ["approved-premium-requests", page],
      });
    },
    onError: (error) => {
      console.error("❌ Error making user premium:", error);
      Swal.fire("Error", "Failed to make user premium", "error");
    },
  });

  const handleMakePremium = (userId) => {
    console.log("🟡 Confirming make premium for user ID:", userId);
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
      <p className="text-center text-gray-500 mt-8">
        Loading premium requests...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">
        Error loading premium requests.
      </p>
    );
  }

  // data.data হচ্ছে ইউজারদের অ্যারে
  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        Premium Approval Requests
      </h1>

      {users.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-sm text-gray-100 bg-gradient-to-r from-rose-600 to-amber-500">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">#</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Name</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Email</th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Biodata ID
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide text-center">
                  Make Premium
                </th>
              </tr>
            </thead>
            <tbody>
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
                  <td className="px-6 py-4">{user.biodataId ?? "N/A"}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleMakePremium(user._id)}
                      disabled={makePremiumMutation.isLoading}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-full shadow-sm transition disabled:opacity-50"
                    >
                      {makePremiumMutation.isLoading
                        ? "Processing..."
                        : "Make Premium"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No premium approval requests found.
        </p>
      )}

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ApprovedPremium;
