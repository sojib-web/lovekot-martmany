// @ts-nocheck
import React from "react";
import couple1 from "../../assets/banner/Work/4.jpg";
import couple2 from "../../assets/banner/Work/5.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const WeddingMatrimony = () => {
  return (
    <section className="bg-[#fffcf5] py-16 px-6 md:px-20 flex flex-col md:flex-row items-center gap-16">
      {/* Left Images */}
      <div className="relative w-full md:w-1/2 flex justify-center items-start">
        {/* Main image with border and shadow */}
        <div className="overflow-hidden rounded-2xl shadow-2xl w-[380px] md:w-[420px] transition-transform hover:scale-105 duration-300">
          <img
            src={couple1}
            alt="Couple"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Floating image */}
        <div className="absolute -bottom-16 left-20 bg-white p-2 rounded-3xl shadow-xl z-20 transition hover:scale-105 duration-300">
          <img
            src={couple2}
            alt="Couple Laying"
            className="rounded-2xl w-[320px] md:w-[360px] h-auto object-cover"
          />
        </div>

        {/* Decorative border behind */}
        <div className="absolute -bottom-24 left-16 w-[340px] h-[240px] border-[6px] border-pink-200 rounded-3xl z-10" />
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <h2 className="text-4xl lg:text-5xl font-serif text-[#573B17] leading-tight">
          WELCOME TO{" "}
          <span className="block text-pink-700 font-extrabold mt-1">
            LOVEKnot MATRIMONY
          </span>
        </h2>
        <p className="text-gray-700 text-lg max-w-xl">
          Best wedding matrimony — It's a long established fact that a reader
          will be distracted by readable content when looking at its layout.
        </p>

        <p className="text-pink-600 font-semibold">
          <a href="#" className="underline hover:text-pink-800 transition">
            Click here
          </a>{" "}
          to start your matrimony service now.
        </p>

        <hr className="border-t border-gray-300 my-4 w-1/2 md:w-full" />

        <p className="text-gray-700">
          There are many variations of passages of Lorem Ipsum available, but
          most have been altered in some form, with injected humour or
          randomised words that don't look believable.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <div className="flex items-center gap-3">
            <span className="bg-black text-white p-3 rounded-full shadow-md">
              <FaPhoneAlt />
            </span>
            <div>
              <p className="text-gray-500">Enquiry</p>
              <p className="font-semibold text-black text-lg">+01 2242 3366</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-black text-white p-3 rounded-full shadow-md">
              <HiOutlineMail />
            </span>
            <div>
              <p className="text-gray-500">Get Support</p>
              <p className="font-semibold text-black text-lg">
                info@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingMatrimony;
