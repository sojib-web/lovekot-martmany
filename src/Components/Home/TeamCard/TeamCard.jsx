import { useQuery } from "@tanstack/react-query";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router"; // ✅ Correct import
import { useState } from "react";
import useAxios from "../../../hooks/useAxios";

const TeamGrid = () => {
  const axiosSecure = useAxios();
  const [sortOrder, setSortOrder] = useState("asc"); // 🔄 For sorting dropdown

  const {
    data: teamMembers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamMembers", sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-profiles?order=${sortOrder}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load data</p>
    );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto mt-20">
      {/* Section Title */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-3 lg:col-span-4 text-center mb-10">
          <p className="uppercase tracking-widest text-[18px] text-[#9c774a] font-[cursive] mb-2">
            Meet Our Cherished Professionals
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#4c2e05] font-serif">
            Our Loving Professionals
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
            Each of our professional members is here to help you on your journey
            to find your perfect match. Discover individuals who are dedicated,
            passionate, and ready to build a beautiful future.
          </p>

          {/* Sort Dropdown */}
          <div className="mb-6 text-right">
            <label className="mr-2 font-medium text-sm text-[#5f4120]">
              Sort by age:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-[#5f4120] rounded-md px-4 py-[6px] text-sm text-[#5f4120] bg-white focus:outline-none focus:ring-2 focus:ring-[#e3c6a0] transition duration-200 ease-in-out shadow-sm"
            >
              <option value="desc">30 -+ 40</option>
              <option value="asc">40 -+ 50</option>
            </select>
          </div>
        </div>

        {/* Profile Cards */}
        {teamMembers.map((member) => (
          <div
            key={member._id || member.id}
            className="group relative overflow-hidden rounded-xl shadow bg-white transition-all duration-300 hover:shadow-lg"
          >
            <img
              src={member.profileImage}
              alt={`Biodata ${member.id}`}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
            />

            <div className="text-center py-4 bg-[#fffaf1]">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.type}
              </h3>
              <p className="text-sm text-gray-500">
                {member.occupation} · Age {member.age}
              </p>
              <p className="text-sm text-gray-400">{member.division}</p>
            </div>

            {/* Overlay on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[50%] opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-gradient-to-t from-black via-black/80 to-transparent h-full px-4 pt-6 pb-4 rounded-t-[100%] text-white flex flex-col items-center justify-end">
                <h3 className="text-lg font-semibold">{member.type}</h3>
                <p className="text-sm text-gray-200">
                  {member.occupation} · Age {member.age}
                </p>

                <div className="mt-3 flex gap-4 text-white">
                  {member.social?.facebook && (
                    <a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF className="hover:text-blue-500" />
                    </a>
                  )}
                  {member.social?.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter className="hover:text-sky-400" />
                    </a>
                  )}
                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedinIn className="hover:text-blue-600" />
                    </a>
                  )}
                  {member.social?.instagram && (
                    <a
                      href={member.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram className="hover:text-pink-500" />
                    </a>
                  )}
                </div>

                <Link to={`/biodata/${member.id}`}>
                  <button className="mt-4 px-4 py-2 bg-white text-black text-sm font-medium rounded hover:bg-gray-200 transition">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
