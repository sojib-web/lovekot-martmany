// @ts-nocheck
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Pagination from "../../../Components/Pagination/Pagination";

const ApprovedContactRequest = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // প্রতি পেজে কত আইটেম দেখাবে

  // React Query দিয়ে page অনুসারে ডাটা ফেচ করা
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allContactRequests", page],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact-requests", {
        params: { page, limit },
      });
      return res.data; // structure: { total, page, limit, totalPages, data: [...] }
    },
    keepPreviousData: true,
  });

  // Approve করার মিউটেশন
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/contact-requests/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire(
        "Approved!",
        "Contact request approved successfully.",
        "success"
      );
      queryClient.invalidateQueries(["allContactRequests", page]);
    },
  });

  const handleApprove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Loading contact requests...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-8">
        Error loading contact requests: {error.message}
      </p>
    );
  }

  // মূল contactRequests array
  const contactRequests = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        All Contact Requests
      </h1>

      {contactRequests.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-sm text-gray-100 bg-gradient-to-r from-rose-600 to-amber-500">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">#</th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  User Email
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Biodata ID
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Transaction ID
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contactRequests.map((req, index) => {
                const serialNumber = (page - 1) * limit + index + 1;
                return (
                  <tr
                    key={req._id}
                    className={`border-b hover:bg-rose-50 transition duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">{serialNumber}</td>
                    <td className="px-6 py-4 font-medium">{req.userEmail}</td>
                    <td className="px-6 py-4">{req.biodataId}</td>
                    <td className="px-6 py-4">{req.transactionId}</td>
                    <td className="px-6 py-4 capitalize">{req.status}</td>
                    <td className="px-6 py-4 text-center">
                      {req.status === "approved" ? (
                        <span className="text-green-600 font-semibold">
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full shadow-sm transition"
                          disabled={approveMutation.isLoading}
                        >
                          {approveMutation.isLoading
                            ? "Approving..."
                            : "Approve"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No contact requests found.
        </p>
      )}

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ApprovedContactRequest;
