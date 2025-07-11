// @ts-nocheck
import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../Home/TeamCard/ProfileCard";
import Swal from "sweetalert2"; // Import SweetAlert2

const BiodataDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  // Fetch biodata details by ID
  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata/${id}`);
      return res.data;
    },
  });

  // Fetch similar biodata (same type, max 3, excluding current)
  const { data: similarBiodata = [] } = useQuery({
    queryKey: ["similar", biodata?.type],
    enabled: !!biodata?.type,
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata?type=${biodata.type}`);
      return res.data.filter((bd) => bd._id !== biodata._id).slice(0, 3);
    },
  });

  const handleAddToFavourites = async () => {
    if (!user) {
      return Swal.fire({
        icon: "warning",
        title: "You must be logged in",
        text: "Please login to add favourites.",
        confirmButtonColor: "#3085d6",
      });
    }

    const favPayload = {
      biodataId: biodata._id,
      userEmail: user?.email,
    };

    try {
      await axiosSecure.post("/favourites", favPayload);
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Added to favourites successfully ✅",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong ❌",
      });
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata._id}`);
  };

  if (isLoading) return <p>Loading biodata...</p>;

  const isPremium = user?.role === "premium";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Biodata Details</h1>

      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={biodata.profileImage}
          alt={`Profile of ${biodata.name || biodata.type}`}
          className="w-48 h-48 rounded-lg object-cover"
        />
        <div className="flex-1">
          <p>
            <strong>ID:</strong> {biodata._id}
          </p>
          <p>
            <strong>Name:</strong> {biodata.name || "N/A"}
          </p>
          <p>
            <strong>Age:</strong> {biodata.age}
          </p>
          <p>
            <strong>Division:</strong> {biodata.division}
          </p>
          <p>
            <strong>Type:</strong> {biodata.type}
          </p>
          <p>
            <strong>Occupation:</strong> {biodata.occupation}
          </p>
          <p>
            <strong>Father's Name:</strong> {biodata.fatherName || "N/A"}
          </p>
          <p>
            <strong>Mother's Name:</strong> {biodata.motherName || "N/A"}
          </p>

          {isPremium ? (
            <>
              <p>
                <strong>Email:</strong> {biodata.contactEmail || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {biodata.contactPhone || "N/A"}
              </p>
            </>
          ) : (
            <p className="text-red-500 mt-2 font-medium">
              Contact info is only visible to Premium Members.
            </p>
          )}

          <div className="mt-6 space-x-4">
            <button
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
              onClick={handleAddToFavourites}
            >
              Add to Favourites
            </button>

            {!isPremium && (
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={handleRequestContact}
              >
                Request Contact Information
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Similar Biodata Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Similar Biodata</h2>
        {similarBiodata.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarBiodata.map((bd) => (
              <ProfileCard key={bd._id} member={bd} fullView={false} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No similar biodata found.</p>
        )}
      </div>
    </div>
  );
};

export default BiodataDetails;
