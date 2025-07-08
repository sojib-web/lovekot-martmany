import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const TeamGrid = () => {
  const teamMembers = [
    {
      id: 1,
      type: "Male",
      profileImage: "https://i.ibb.co/0y7zWjB/male1.jpg",
      division: "Dhaka",
      age: 23,
      occupation: "Student",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      type: "Female",
      profileImage: "https://i.ibb.co/YD34pR1/female1.jpg",
      division: "Chattagram",
      age: 30,
      occupation: "House wife",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 3,
      type: "Male",
      profileImage: "https://i.ibb.co/dPSpPvz/male2.jpg",
      division: "Sylhet",
      age: 45,
      occupation: "Job",
      social: {
        facebook: "#",
        twitter: "#",
      },
    },
    {
      id: 4,
      type: "Female",
      profileImage: "https://i.ibb.co/JFtvwq0/female2.jpg",
      division: "Khulna",
      age: 23,
      occupation: "Student",
      social: {
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: 5,
      type: "Male",
      profileImage: "https://i.ibb.co/FwnKvvv/male3.jpg",
      division: "Barisal",
      age: 30,
      occupation: "Job",
      social: {
        facebook: "#",
        twitter: "#",
      },
    },
    {
      id: 6,
      type: "Female",
      profileImage: "https://i.ibb.co/d4WSFYz/female3.jpg",
      division: "Rangpur",
      age: 45,
      occupation: "House wife",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 7,
      type: "Male",
      profileImage: "https://i.ibb.co/SfY0vST/male4.jpg",
      division: "Mymensingh",
      age: 30,
      occupation: "Job",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 8,
      type: "Female",
      profileImage: "https://i.ibb.co/yf2tcDg/female4.jpg",
      division: "Dhaka",
      age: 23,
      occupation: "Student",
      social: {
        facebook: "#",
        instagram: "#",
      },
    },
  ];

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group relative overflow-hidden rounded-xl shadow bg-white transition-all duration-300 hover:shadow-lg"
          >
            {/* Image */}
            <img
              src={member.profileImage}
              alt={`Biodata ${member.id}`}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition duration-300"
            />

            {/* Default bottom content */}
            <div className="text-center py-4 bg-[#fffaf1]">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.type}
              </h3>
              <p className="text-sm text-gray-500">
                {member.occupation} · Age {member.age}
              </p>
              <p className="text-sm text-gray-400">{member.division}</p>
            </div>

            {/* Hover Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[50%] opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="bg-gradient-to-t from-black via-black/80 to-transparent h-full px-4 pt-6 pb-4 rounded-t-[100%] text-white flex flex-col items-center justify-end">
                <h3 className="text-lg font-semibold">{member.type}</h3>
                <p className="text-sm text-gray-200">
                  {member.occupation} · Age {member.age}
                </p>

                {/* Social Links */}
                {Object.keys(member.social).length > 0 && (
                  <div className="mt-3 flex gap-4 text-white">
                    {member.social.facebook && (
                      <a href={member.social.facebook}>
                        <FaFacebookF className="hover:text-blue-500" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter}>
                        <FaTwitter className="hover:text-sky-400" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin}>
                        <FaLinkedinIn className="hover:text-blue-600" />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram}>
                        <FaInstagram className="hover:text-pink-500" />
                      </a>
                    )}
                  </div>
                )}

                {/* View Profile Button */}
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
