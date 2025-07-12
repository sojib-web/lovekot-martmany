/* eslint-disable no-unused-vars */
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loader from "../../../Components/shared/Loader";

const MyContactRequest = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/contact-requests/${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Request?",
      text: "Are you sure you want to delete this contact request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/contact-requests/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your request has been removed.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the request.", "error");
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        My Contact Requests
      </h2>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-sm text-white bg-gradient-to-r from-rose-600 to-amber-500">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wide">SL</th>
              <th className="px-6 py-4 font-semibold tracking-wide">Name</th>
              <th className="px-6 py-4 font-semibold tracking-wide">
                Biodata ID
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide">Status</th>
              <th className="px-6 py-4 font-semibold tracking-wide">
                Mobile No
              </th>
              <th className="px-6 py-4 font-semibold tracking-wide">Email</th>
              <th className="px-6 py-4 font-semibold tracking-wide text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-400 font-medium italic"
                >
                  No contact requests found.
                </td>
              </tr>
            )}

            {requests.map((req, index) => (
              <tr
                key={req._id}
                className={`border-b hover:bg-rose-50 transition duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{req.name || "N/A"}</td>
                <td className="px-6 py-4">{req.biodataId || "N/A"}</td>
                <td className="px-6 py-4">
                  {req.status === "approved" ? (
                    <span className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{req.mobileNumber || "---"}</td>
                <td className="px-6 py-4">{req.contactEmail || "---"}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full shadow-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
