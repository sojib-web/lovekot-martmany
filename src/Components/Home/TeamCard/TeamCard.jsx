// @ts-nocheck
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import ProfileCard from "./ProfileCard";
import decorationImg from "../../../assets/banner/1.png";
import Loader from "../../shared/Loader";

const TeamGrid = () => {
  const axiosSecure = useAxios();

  // Fetch premium profiles (limit 8)
  const {
    data: teamMembers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/premium-profiles?limit=8`);
      // Adjust depending on API response structure
      return res.data?.data || res.data || [];
    },
    keepPreviousData: true,
  });

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <Loader />
      </div>
    );

  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load data</p>
    );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto mt-20">
      {/* Heading */}
      <div className="sm:col-span-full text-center mb-10">
        <p className="uppercase tracking-widest text-[18px] text-[#9c774a] font-[cursive] mb-2">
          Meet Our Cherished Professionals
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold text-[#4c2e05] font-serif">
          Our Loving Professionals
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
          Each of our professional members is here to help you on your journey
          to find your perfect match.
        </p>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <span className="h-px w-16 md:w-24 bg-pink-300"></span>
          <img
            src={decorationImg}
            alt="decoration"
            className="w-32 md:w-40 animate-pulse"
          />
          <span className="h-px w-16 md:w-24 bg-pink-300"></span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <ProfileCard key={member._id || member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
