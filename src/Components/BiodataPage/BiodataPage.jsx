import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ProfileCard from "../../Components/Home/TeamCard/ProfileCard";

const divisions = [
  "All",
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];

const BiodataPage = () => {
  const axiosSecure = useAxios();

  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAge, setSelectedAge] = useState("All");
  const [selectedDivision, setSelectedDivision] = useState("All");

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profiles");
      console.log("Fetched profiles from API:", res.data);
      return res.data;
    },
  });

  const filterProfiles = () => {
    return profiles
      .filter((profile) =>
        selectedGender === "All" ? true : profile.type === selectedGender
      )
      .filter((profile) => {
        if (selectedAge === "All") return true;
        const age = profile.age;
        if (selectedAge === "18 to 30") return age >= 18 && age <= 30;
        if (selectedAge === "30 to 40") return age > 30 && age <= 40;
        return true;
      })
      .filter((profile) =>
        selectedDivision === "All"
          ? true
          : profile.division === selectedDivision
      );
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-[#fdf9f0] min-h-screen py-10 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Section */}
        <div className="rounded-2xl shadow-lg p-6  border-yellow-300">
          <h2 className="text-2xl font-extrabold mb-6 text-yellow-700">
            I'm looking for
          </h2>

          {/* Gender Filter */}
          <label className="block mb-4">
            <span className="text-yellow-800 font-semibold mb-2 block">
              Gender
            </span>
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="w-full border border-yellow-400 px-4 py-2 rounded-lg"
            >
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>

          {/* Age Filter */}
          <label className="block mb-4">
            <span className="text-yellow-800 font-semibold mb-2 block">
              Age Range
            </span>
            <select
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
              className="w-full border border-yellow-400 px-4 py-2 rounded-lg"
            >
              <option>All</option>
              <option>18 to 30</option>
              <option>30 to 40</option>
            </select>
          </label>

          {/* Division Filter */}
          <label className="block">
            <span className="text-yellow-800 font-semibold mb-2 block">
              Division
            </span>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full border border-yellow-400 px-4 py-2 rounded-lg"
            >
              {divisions.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Biodata Cards */}
        <div className="md:col-span-3">
          <h3 className="text-xl font-semibold mb-6">
            Showing{" "}
            <span className="text-purple-600 font-bold">
              {filterProfiles().length}
            </span>{" "}
            profiles
          </h3>

          {filterProfiles().length === 0 ? (
            <p className="text-center text-gray-500 text-lg mt-20">
              Sorry, no profiles matched your search criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filterProfiles().map((profile) => (
                <ProfileCard key={profile._id || profile.id} member={profile} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiodataPage;
