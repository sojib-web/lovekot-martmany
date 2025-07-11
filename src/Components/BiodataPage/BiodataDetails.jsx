/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import ProfileCard from "../Home/TeamCard/ProfileCard";
import Swal from "sweetalert2";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const BiodataDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const {
    data: biodata = null,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodata/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: similarBiodata = [] } = useQuery({
    queryKey: ["similar", biodata?.biodataType],
    enabled: !!biodata?.biodataType,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/biodata?biodataType=${biodata.biodataType}`
      );
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

    try {
      await axiosSecure.post("/favourites", {
        biodataId: biodata._id,
        userEmail: user?.email,
      });

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

  if (isLoading) return <p className="text-center py-10">Loading biodata...</p>;
  if (isError || !biodata)
    return (
      <p className="text-center py-10 text-red-500">Biodata not found ❌</p>
    );

  const isPremium = user?.role === "premium";
  const imageUrl =
    biodata.profileImage?.trim() !== ""
      ? biodata.profileImage
      : "/default-profile.png";

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-rose-700">
        Biodata Details
      </h1>

      <div className=" rounded-2xl  p-8 grid md:grid-cols-2 gap-8 items-start">
        <img
          src={imageUrl}
          alt={`Profile of ${biodata.name || "Member"}`}
          className="w-full max-w-sm mx-auto rounded-2xl object-cover shadow-lg"
        />

        <div className="space-y-3 text-gray-800">
          <h2 className="text-2xl font-semibold text-rose-600">
            {biodata.name || "N/A"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <p>
              <strong>ID:</strong> {biodata.biodataId || biodata._id}
            </p>
            <p>
              <strong>Age:</strong> {biodata.age}
            </p>
            <p>
              <strong>Date of Birth:</strong> {biodata.dateOfBirth || "N/A"}
            </p>
            <p>
              <strong>Height:</strong> {biodata.height || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong> {biodata.weight || "N/A"}
            </p>
            <p>
              <strong>Race:</strong> {biodata.race || "N/A"}
            </p>
            <p>
              <strong>Type:</strong> {biodata.biodataType}
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
            <p>
              <strong>Division (Present):</strong> {biodata.presentDivision}
            </p>
            <p>
              <strong>Division (Permanent):</strong> {biodata.permanentDivision}
            </p>
            <p>
              <strong>Expected Age:</strong>{" "}
              {biodata.expectedPartnerAge || "N/A"}
            </p>
            <p>
              <strong>Expected Height:</strong>{" "}
              {biodata.expectedPartnerHeight || "N/A"}
            </p>
            <p>
              <strong>Expected Weight:</strong>{" "}
              {biodata.expectedPartnerWeight || "N/A"}
            </p>
          </div>

          <div className="mt-4 flex gap-4 text-xl">
            {biodata.social?.facebook && (
              <a
                href={biodata.social.facebook}
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF className="hover:text-blue-600" />
              </a>
            )}
            {biodata.social?.twitter && (
              <a href={biodata.social.twitter} target="_blank" rel="noreferrer">
                <FaTwitter className="hover:text-sky-400" />
              </a>
            )}
            {biodata.social?.linkedin && (
              <a
                href={biodata.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn className="hover:text-blue-700" />
              </a>
            )}
            {biodata.social?.instagram && (
              <a
                href={biodata.social.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram className="hover:text-pink-500" />
              </a>
            )}
          </div>

          {isPremium ? (
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <p>
                <strong>Email:</strong> {biodata.contactEmail || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {biodata.mobileNumber || "N/A"}
              </p>
            </div>
          ) : (
            <p className="text-red-500 font-medium mt-3">
              Contact info is only visible to Premium Members.
            </p>
          )}

          <div className="mt-6 flex gap-4">
            <button
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md shadow"
              onClick={handleAddToFavourites}
            >
              Add to Favourites
            </button>
            {!isPremium && (
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow"
                onClick={handleRequestContact}
              >
                Request Contact Info
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Similar Biodata</h2>
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
