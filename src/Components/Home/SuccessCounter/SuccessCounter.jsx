/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { FaHeart, FaUsers, FaMale, FaFemale } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import decorationImg from "../../../assets/banner/1.png";

const SuccessCounter = () => {
  const axiosSecure = useAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["success-counter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/success-counter");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load stats.</p>
    );

  const stats = [
    {
      icon: <FaHeart className="text-white text-2xl" />,
      value: data.marriagesCount,
      label: "COUPLES PAIRED",
      bgColor: "bg-pink-500",
    },
    {
      icon: <FaUsers className="text-white text-2xl" />,
      value: data.totalProfiles,
      label: "REGISTERED USERS",
      bgColor: "bg-yellow-500",
    },
    {
      icon: <FaMale className="text-white text-2xl" />,
      value: data.boysCount,
      label: "MEN'S BIODATA",
      bgColor: "bg-blue-500",
    },
    {
      icon: <FaFemale className="text-white text-2xl" />,
      value: data.girlsCount,
      label: "WOMEN'S BIODATA",
      bgColor: "bg-purple-500",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#fefbf3] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <p className="uppercase text-sm tracking-widest text-gray-500">
          Our Achievements
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#4c2e05] mt-2">
          LoveKnot Success Stories
        </h2>
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

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-3xl -translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full opacity-30 blur-3xl translate-x-1/4 translate-y-1/4"></div>

      {/* Counters */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/40 border border-white/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-full mb-4 ${item.bgColor} text-white text-3xl`}
            >
              {item.icon}
            </div>
            <h3 className="text-4xl font-extrabold text-[#4c2e05]">
              <CountUp start={0} end={item.value} duration={2} separator="," />+
            </h3>
            <p className="text-lg text-gray-700 mt-2 font-medium">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
