import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";

const EditProfilePage = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Update Firebase Profile
      await updateUserProfile({ displayName: name, photoURL });

      // 2️⃣ Update Backend DB
      await axiosSecure.put(`/users/${user.email}`, { name, photoURL });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        <h2 className="text-4xl font-extrabold text-rose-600 dark:text-pink-400 mb-8 text-center">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src={photoURL || "/default-avatar.png"}
              alt={name}
              className="w-32 h-32 rounded-full border-4 border-rose-400 object-cover shadow-lg"
            />
            <input
              type="text"
              placeholder="Photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full md:w-2/3 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
