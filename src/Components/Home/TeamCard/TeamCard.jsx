// @ts-nocheck
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import ProfileCard from "./ProfileCard";

const TeamGrid = () => {
  const axiosSecure = useAxios();
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch premium profiles sorted by age (asc or desc)
  const {
    data: teamMembers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["teamMembers", sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/premium-profiles?order=${sortOrder}&limit=8`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load data</p>
    );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto mt-20">
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
            to find your perfect match.
          </p>

          <div className="mb-6 text-right">
            <label className="mr-2 font-medium text-sm text-[#5f4120]">
              Sort by age:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-[#5f4120] rounded-md px-4 py-[6px] text-sm text-[#5f4120] bg-white focus:outline-none focus:ring-2 focus:ring-[#e3c6a0] transition duration-200 ease-in-out shadow-sm"
            >
              <option value="asc">40 - 50</option>
              <option value="desc">30 - 40</option>
            </select>
          </div>
        </div>

        {teamMembers.map((member) => (
          <ProfileCard key={member._id || member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamGrid;
