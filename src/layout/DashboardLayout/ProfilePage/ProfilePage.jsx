// pages/dashboard/ProfilePage.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router";
import Loader from "../../../Components/shared/Loader";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
        console.log("Fetched User Data:", res.data); // debug
        setUserData(res.data || {});
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserData({});
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, axiosSecure]);

  const handleEditProfile = () => navigate("/dashboard/EditProfilePage");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <Card className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 transition-all duration-500 ">
          <CardHeader className="text-center space-y-3 py-6">
            <CardTitle className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 text-transparent bg-clip-text tracking-wide">
              My Profile
            </CardTitle>
            <Separator className="w-24 mx-auto bg-gradient-to-r from-rose-500 to-amber-400 h-[3px] rounded-full" />
          </CardHeader>

          <CardContent className="px-6 py-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <Avatar className="w-36 h-36 border-4 border-white shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-rose-200">
                    <AvatarImage
                      src={userData.photoURL || "/default-avatar.png"}
                      alt={userData.name || "User"}
                    />
                    <AvatarFallback className="text-3xl font-bold text-gray-700">
                      {userData.name ? userData.name[0].toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                </div>

                <Badge className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-5 py-1.5 text-sm font-semibold shadow-lg hover:scale-105 transition-transform">
                  {userData.role || "User"}
                </Badge>
              </div>

              {/* Info Section */}
              <div className="flex-1 grid grid-cols-1 gap-5 w-full">
                {/* Name */}
                <Card className="p-5 border border-rose-100 bg-white hover:shadow-md hover:border-rose-300 transition-all duration-300 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Full Name
                  </h3>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {userData.name || "N/A"}
                  </p>
                </Card>

                {/* Email */}
                <Card className="p-5 border border-rose-100 bg-white hover:shadow-md hover:border-rose-300 transition-all duration-300 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-500">
                    Email Address
                  </h3>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {userData.email || "N/A"}
                  </p>
                </Card>

                {/* Role */}
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-10 flex justify-center md:justify-end gap-4">
              <Button
                onClick={handleEditProfile}
                className="px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 bg-gradient-to-r from-rose-500 to-amber-500 hover:scale-105 hover:shadow-rose-300"
              >
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
