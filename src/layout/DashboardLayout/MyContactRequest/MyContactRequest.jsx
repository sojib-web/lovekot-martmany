/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  console.log("✅ Logged-in user:", user?.email);

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      console.log("📡 Fetching contact requests for:", user.email);
      const res = await axiosSecure.get(`/contact-requests/${user.email}`);
      console.log("✅ Server response data:", res.data);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    console.log("🗑️ Attempting to delete request with ID:", id);

    const confirm = await Swal.fire({
      title: "Delete Request?",
      text: "Are you sure you want to delete this contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      confirmButtonColor: "#ef4444", // Tailwind red-500
      cancelButtonColor: "#6b7280", // Tailwind gray-500
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/contact-requests/${id}`);
        console.log("🧾 Delete response from server:", res.data);

        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been removed.", "success");
          refetch();
        } else {
          console.warn("⚠️ Delete API call succeeded but no item deleted.");
        }
      } catch (error) {
        console.error("❌ Error deleting contact request:", error);
        Swal.fire("Error!", "Failed to delete the request.", "error");
      }
    } else {
      console.log("❌ Delete cancelled by user");
    }
  };

  if (isLoading) {
    console.log("⏳ Contact request data loading...");
    return (
      <p className="text-center py-20 text-xl font-semibold text-pink-600 animate-pulse">
        Loading...
      </p>
    );
  }

  console.log("🧾 Final Render - Requests:", requests);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-pink-600 tracking-wide drop-shadow-sm">
        My Contact Requests
      </h2>

      <div className="overflow-x-auto rounded-lg border border-pink-300 shadow-md">
        <table className="min-w-full divide-y divide-pink-200">
          <thead className="bg-pink-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Biodata ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Mobile No
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-pink-800 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-pink-200">
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-pink-400 font-semibold italic"
                >
                  No contact requests found.
                </td>
              </tr>
            )}

            {requests.map((req, index) => {
              console.log(`🔍 Row ${index + 1} →`, req);
              return (
                <tr
                  key={req._id}
                  className="hover:bg-pink-50 transition duration-300 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-900 font-semibold">
                    {req.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-700">
                    {req.biodataId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {req.status === "approved" ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-800 font-medium">
                    {req.mobileNumber || "---"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-800 font-medium">
                    {req.contactEmail || "---"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition"
                      aria-label="Delete contact request"
                      title="Delete contact request"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
