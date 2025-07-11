/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import {
  HiUser,
  HiCalendar,
  HiScale,
  HiPhone,
  HiMail,
  HiOfficeBuilding,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi";

const ViewBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: biodata = {}, isLoading } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/profile/${user?.email}`);
      return res.data;
    },
  });

  const handleMakePremium = async () => {
    const result = await Swal.fire({
      title: "Make Biodata Premium?",
      text: "Are you sure you want to send request for premium approval?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Send Request",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(
          `/profile/premium-request/${biodata._id}`
        );
        if (res.data.modifiedCount > 0) {
          Swal.fire(
            "Success!",
            "Request sent to admin for approval ✅",
            "success"
          );
        }
      } catch (error) {
        Swal.fire("Error!", "Something went wrong ❌", "error");
      }
    }
  };

  if (isLoading)
    return (
      <p className="text-center py-10 text-gray-500 text-lg animate-pulse">
        Loading your biodata...
      </p>
    );

  return (
    <section className="max-w-5xl mx-auto bg-gradient-to-r from-pink-50 to-yellow-50 p-8 rounded-xl shadow-xl mt-12">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-pink-700 tracking-wide drop-shadow-md">
        Your Biodata
      </h2>

      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center md:justify-start md:items-start w-full md:w-48">
          <img
            src={biodata.profileImage || "/default-profile.png"}
            alt="Profile"
            className="w-48 h-48 rounded-full border-8 border-pink-300 shadow-lg object-cover"
          />
        </div>

        {/* Info Panel */}
        <div className="flex-grow space-y-8 w-full">
          {/* Basic Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-pink-600 flex items-center gap-3">
              <HiUser className="text-pink-500" size={24} /> Personal
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-base">
              <p className="whitespace-nowrap">
                <strong>Biodata Type:</strong> {biodata.biodataType || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Name:</strong> {biodata.name || "N/A"}
              </p>
              <p className="flex items-center gap-2 whitespace-nowrap">
                <HiCalendar className="text-pink-400" size={20} />
                <span>
                  <strong>Date of Birth:</strong> {biodata.dateOfBirth || "N/A"}
                </span>
              </p>
              <p className="whitespace-nowrap">
                <strong>Age:</strong> {biodata.age || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Occupation:</strong> {biodata.occupation || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Race:</strong> {biodata.race || "N/A"}
              </p>
            </div>
          </div>

          {/* Physical Attributes */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-pink-600 flex items-center gap-3">
              <HiScale className="text-pink-500" size={24} /> Physical
              Attributes
            </h3>
            <div className="grid grid-cols-3 gap-6 text-gray-700 text-base text-center">
              <div>
                <p className="text-2xl font-bold text-pink-700">
                  {biodata.height || "N/A"}
                </p>
                <p>Height</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">
                  {biodata.weight || "N/A"}
                </p>
                <p>Weight</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">
                  {biodata.expectedPartnerAge || "N/A"}
                </p>
                <p>Expected Partner Age</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">
                  {biodata.expectedPartnerHeight || "N/A"}
                </p>
                <p>Expected Partner Height</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-pink-700">
                  {biodata.expectedPartnerWeight || "N/A"}
                </p>
                <p>Expected Partner Weight</p>
              </div>
            </div>
          </div>

          {/* Family Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-pink-600 flex items-center gap-3">
              <HiUserGroup className="text-pink-500" size={24} /> Family
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-base">
              <p className="whitespace-nowrap">
                <strong>Father's Name:</strong> {biodata.fatherName || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Mother's Name:</strong> {biodata.motherName || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Permanent Division:</strong>{" "}
                {biodata.permanentDivision || "N/A"}
              </p>
              <p className="whitespace-nowrap">
                <strong>Present Division:</strong>{" "}
                {biodata.presentDivision || "N/A"}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-pink-600 flex items-center gap-3">
              <HiPhone className="text-pink-500" size={24} /> Contact
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10 text-gray-700 text-base">
              <p className="flex items-center gap-3 whitespace-nowrap">
                <HiMail className="text-pink-400" size={20} />{" "}
                <span>{biodata.contactEmail || "N/A"}</span>
              </p>
              <p className="flex items-center gap-3 whitespace-nowrap">
                <HiPhone className="text-pink-400" size={20} />{" "}
                <span>{biodata.mobileNumber || "N/A"}</span>
              </p>
            </div>
          </div>

          {/* Premium Status & Action */}
          <div className="text-center mt-6">
            {!biodata.isPremium && !biodata.premiumRequested && (
              <button
                onClick={handleMakePremium}
                className="inline-block bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-pink-600 hover:to-yellow-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
                aria-label="Make biodata premium"
              >
                Request Premium Approval
              </button>
            )}

            {biodata.premiumRequested && !biodata.isPremium && (
              <p className="inline-block bg-yellow-200 text-yellow-800 px-5 py-2 rounded-full font-semibold shadow-inner">
                ⏳ Your request for premium is pending admin approval
              </p>
            )}

            {biodata.isPremium && (
              <p className="inline-block bg-green-200 text-green-800 px-5 py-2 rounded-full font-semibold shadow-inner">
                💎 Your biodata is already premium
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewBiodata;
