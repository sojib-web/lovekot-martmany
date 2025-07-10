/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaUsers, FaMale, FaFemale } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const SuccessCounter = () => {
  const axiosSecure = useAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["success-counter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/success-counter");
      console.log("📦 Fetched counter data:", res.data); // Log fetched API data
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) {
    console.error("❌ Error loading counter data:", error); // Log error
    return <p className="text-center text-red-500">Failed to load stats.</p>;
  }

  const stats = [
    {
      icon: <FaHeart className="text-brown-700 text-xl" />,
      value: data.marriagesCount,
      suffix: "+",
      label: "COUPLES PAIRED",
    },
    {
      icon: <FaUsers className="text-brown-700 text-xl" />,
      value: data.totalProfiles,
      suffix: "+",
      label: "REGISTERED USERS",
    },
    {
      icon: <FaMale className="text-brown-700 text-xl" />,
      value: data.boysCount,
      suffix: "+",
      label: "MEN'S BIODATA",
    },
    {
      icon: <FaFemale className="text-brown-700 text-xl" />,
      value: data.girlsCount,
      suffix: "+",
      label: "WOMEN'S BIODATA",
    },
  ];

  console.log("📊 Mapped stats array:", stats); // Log final stats to be rendered

  return (
    <section className="bg-[#fffdf7] border-t border-b border-[#d1cfc7] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center divide-x divide-[#d1cfc7]">
        {stats.map((item, index) => (
          <div key={index} className="px-4 py-6">
            <div className="flex justify-center items-center mb-2">
              <div className="border border-[#d1cfc7] rounded p-2">
                {item.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#5e3b17]">
              <CountUp start={0} end={item.value} duration={2} separator="," />
              {item.suffix}
            </h3>
            <p className="text-xs text-[#5e3b17] mt-1 tracking-wide">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
