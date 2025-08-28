import React, { useEffect, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import Loader from "@/Components/shared/Loader";

const dummyMatches = [
  {
    _id: "1",
    name: "John Doe",
    age: 28,
    location: "Dhaka",
    photoURL: "/default-avatar.png",
    premium: true,
  },
  {
    _id: "2",
    name: "Jane Smith",
    age: 25,
    location: "Chittagong",
    photoURL: "/default-avatar.png",
    premium: false,
  },
  {
    _id: "3",
    name: "Rahim Khan",
    age: 30,
    location: "Khulna",
    photoURL: "/default-avatar.png",
    premium: true,
  },
];

const MyMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMatches(dummyMatches);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {matches.map((match) => (
        <Card
          key={match._id}
          className="shadow-lg rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
        >
          <div className="relative">
            {match.premium && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10 flex items-center gap-1">
                <FaStar /> Premium
              </div>
            )}
          </div>
          <CardHeader className="flex flex-col items-center py-4 relative z-0">
            <div className="relative group">
              <Avatar
                src={match.photoURL}
                alt={match.name}
                size={64}
                className="transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-10 opacity-0 group-hover:opacity-20 transition duration-300"></div>
            </div>
            <h3 className="text-lg font-bold mt-3 text-center">
              {match.name}, {match.age}
            </h3>
            <Badge
              variant="secondary"
              className="mt-1 text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-800"
            >
              {match.location}
            </Badge>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <Button className="w-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300">
              View Profile
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyMatches;
