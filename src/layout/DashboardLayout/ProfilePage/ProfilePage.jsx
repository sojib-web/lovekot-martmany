// pages/dashboard/ProfilePage.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import Loader from "../../../Components/shared/Loader";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.email) return;
      try {
        const res = await axiosSecure.get(`/users/${user.email}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, axiosSecure]);

  const handleEditProfile = () => {
    navigate("/dashboard/EditProfilePage");
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        <Loader />
      </p>
    );
  if (!userData) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <div className="min-h-screen 0 py-10">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-rose-600 to-yellow-400 text-transparent bg-clip-text">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-36 h-36">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full p-1 animate-pulse"></div>
            <img
              src={userData.photoURL || "/default-avatar.png"}
              alt={userData.name}
              className="relative w-full h-full rounded-full object-cover border-4 border-white"
            />
          </div>

          <div className="flex-1 grid grid-cols-1 gap-4">
            <div className="p-4 bg-rose-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold">Name</h3>
              <p className="text-lg">{userData.name}</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold">Email</h3>
              <p className="text-lg">{userData.email}</p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
              <h3 className="font-semibold">Role</h3>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-white font-semibold text-sm">
                {userData.role}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center md:justify-start">
          <button
            onClick={handleEditProfile}
            className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-8 py-3 rounded-2xl font-bold shadow-lg transition transform hover:scale-105"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
