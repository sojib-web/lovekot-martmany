import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import WeddingMatrimony from "../WeddingMatrimony/WeddingMatrimony";

const About = () => {
  return (
    <>
      {/* Header Section */}
      <section className="bg-[#fffdf6] py-16 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-500 font-semibold uppercase tracking-widest text-xs sm:text-sm md:text-base">
            {/* Optional tagline */}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-600 mt-4 mb-6 leading-snug md:leading-tight">
            About <span className="text-rose-500">LOVEKnot</span>
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed md:leading-7">
            <strong>LOVEKnot</strong> is more than just a matchmaking platform —
            it's a heartfelt journey toward finding true companionship.
            <br className="hidden sm:block" />
            We believe that every love story deserves a beautiful beginning, and
            our mission is to make that possible with trust, care, and
            personalized support. Whether you're starting your search or
            preparing for your forever, LOVEKnot walks with you every step of
            the way.
          </p>
        </div>
      </section>

      {/* WeddingMatrimony Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12">
        <WeddingMatrimony />
      </section>
    </>
  );
};

export default About;
