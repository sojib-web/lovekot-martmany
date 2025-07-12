/* eslint-disable no-unused-vars */
// @ts-nocheck
import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../Components/shared/Loader";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ["favourites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favourites?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/favourites/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["favourites", user?.email]);
      Swal.fire("Deleted!", "Favourite biodata has been removed.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Could not delete the biodata.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this biodata from favourites.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
        My Favourite Biodata
      </h1>

      {favourites.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-sm text-gray-100 bg-gradient-to-r from-rose-600 to-amber-500">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wide">SL</th>
                <th className="px-6 py-4 font-semibold tracking-wide">Name</th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Biodata ID
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Permanent Address
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide">
                  Occupation
                </th>
                <th className="px-6 py-4 font-semibold tracking-wide text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {favourites.map((item, index) => (
                <tr
                  key={item._id}
                  className={`border-b hover:bg-rose-50 transition duration-150 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">
                    {item.biodataUniqueId || item.biodataId}
                  </td>
                  <td className="px-6 py-4">{item.permanentAddress}</td>
                  <td className="px-6 py-4">{item.occupation}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(item._id)}
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
      ) : (
        <p className="text-center text-gray-500 mt-8">
          You have no favourite biodata saved yet.
        </p>
      )}
    </div>
  );
};

export default MyFavorites;
