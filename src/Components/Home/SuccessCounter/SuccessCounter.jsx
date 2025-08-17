// @ts-nocheck
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import decorationImg from "../../../assets/banner/1.png";
import Img from "../../../assets/banner/couple.png";
import Img1 from "../../../assets/banner/login.png";
import Img2 from "../../../assets/banner/man.png";
import Img3 from "../../../assets/banner/businesswoman.png";
import Loader from "../../shared/Loader";

const SuccessCounter = () => {
  const axiosSecure = useAxios();

  const { data, isLoading, error } = useQuery({
    queryKey: ["success-counter"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/success-counter");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <p className="text-center mt-10">
        <Loader />
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load stats.</p>
    );

  const stats = [
    {
      icon: Img,
      value: data.marriagesCount,
      label: "COUPLES PAIRED",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      icon: Img1,
      value: data.totalProfiles,
      label: "REGISTERED USERS",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Img2,
      value: data.boysCount,
      label: "MEN'S BIODATA",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      icon: Img3,
      value: data.girlsCount,
      label: "WOMEN'S BIODATA",
      gradient: "from-purple-400 to-fuchsia-500",
    },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#fefbf3] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <p className="uppercase text-sm tracking-widest text-gray-500">
          Celebrating Milestones
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-[#4c2e05] mt-2">
          LoveKnot Achievements & Success Stories
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
            className="backdrop-blur-md bg-white/50 border border-white/30 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
          >
            <div
              className={`w-24 h-24 flex items-center justify-center rounded-full mb-6 bg-gradient-to-r ${item.gradient} shadow-lg`}
            >
              <img src={item.icon} alt={item.label} className="w-12 h-12" />
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
