import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router";

const ProfileCard = ({ member, fullView = false }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl shadow bg-white transition-all duration-300 ${
        fullView ? "max-w-3xl mx-auto" : "max-w-sm"
      }`}
    >
      <img
        src={member.profileImage}
        alt={`Biodata ${member.id}`}
        className={`w-full object-cover ${
          fullView ? "h-96" : "h-72"
        } transform group-hover:scale-105 transition duration-300`}
      />

      <div className="text-center py-4 bg-[#fffaf1]">
        <h3 className="text-lg font-semibold text-gray-900">{member.type}</h3>
        <p className="text-sm text-gray-500">
          {member.occupation} · Age {member.age}
        </p>
        <p className="text-sm text-gray-400">{member.division}</p>
      </div>

      {!fullView && (
        <>
          {/* Overlay on hover only in card view */}
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
        </>
      )}

      {fullView && (
        <div className="p-6 text-left">
          <h2 className="text-3xl font-bold mb-4">
            {member.name || member.type}
          </h2>
          <p className="mb-2">
            <strong>Type:</strong> {member.type}
          </p>
          <p className="mb-2">
            <strong>Age:</strong> {member.age}
          </p>
          <p className="mb-2">
            <strong>Occupation:</strong> {member.occupation}
          </p>
          <p className="mb-2">
            <strong>Division:</strong> {member.division}
          </p>
          {member.about && (
            <p className="mb-2">
              <strong>About:</strong> {member.about}
            </p>
          )}

          <div className="mt-4 flex gap-6 text-gray-700 text-2xl">
            {member.social?.facebook && (
              <a
                href={member.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            )}
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            )}
            {member.social?.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
