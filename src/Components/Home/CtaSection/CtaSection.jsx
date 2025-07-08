import React from "react";

const CtaSection = () => {
  return (
    <div className="relative bg-pink-600 text-white py-20 text-center overflow-hidden">
      {/* Floating Avatars */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <img
          src="/avatar1.jpg"
          alt="avatar1"
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
        <img
          src="/avatar2.jpg"
          alt="avatar2"
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
        <img
          src="/avatar3.jpg"
          alt="avatar3"
          className="w-20 h-20 rounded-full border-4 border-white object-cover"
        />
      </div>

      {/* Text */}
      <div className="mt-16 px-4">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          Start your love story
        </h3>
        <p className="mb-6 text-sm md:text-base">
          Qiupid: find love with our dating site!
        </p>
        <button className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-6 py-2 rounded-full transition-all">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default CtaSection;
