import React from "react";
import img1 from "../../../assets/banner/Work/chat.png";
import img2 from "../../../assets/banner/Work/love-birds.png";
import img3 from "../../../assets/banner/Work/network.png";
import img4 from "../../../assets/banner/Work/rings.png";
import img5 from "../../../assets/banner/Work/wedding-2.png";
import img6 from "../../../assets/banner/Work/wedding-couple.png";

import decorationImg from "../../../assets/banner/1.png";

const steps = [
  {
    title: "Register",
    time: "7:00 PM",
    description:
      "Create your profile with essential details including your preferences, lifestyle, and expectations to begin your matchmaking journey.",
    image: img1,
  },
  {
    title: "Find your Match",
    time: "7:00 PM",
    description:
      "Browse through thousands of verified profiles and use smart filters to find someone who aligns with your values and interests.",
    image: img2,
  },
  {
    title: "Send Interest",
    time: "7:00 PM",
    description:
      "Express interest in someone you like by sending a connection request. Start building the foundation of a meaningful relationship.",
    image: img3,
  },
  {
    title: "Get Profile Information",
    time: "7:00 PM",
    description:
      "Gain access to detailed profile information including hobbies, education, and family background to understand your match better.",
    image: img4,
  },
  {
    title: "Start Meetups",
    time: "7:00 PM",
    description:
      "Take the next step by arranging virtual or in-person meetings through our platform to get to know each other more personally.",
    image: img5,
  },
  {
    title: "Getting Marriage",
    time: "7:00 PM",
    description:
      "With mutual understanding and family involvement, plan your wedding with confidence — your happily ever after begins here.",
    image: img6,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-[#fefbf3] py-16 px-4">
      <div className="text-center mb-12">
        <p className="uppercase tracking-widest text-[18px] text-[#9c774a] font-[cursive] mb-2">
          Moments
        </p>
        <h2 className="text-4xl md:text-5xl font-semibold text-[#4c2e05] font-serif">
          How it works
        </h2>
        <div className="mt-2 w-16 h-1 bg-pink-400 mx-auto rounded-full"></div>
      </div>

      <div className="flex items-center justify-center mt-6 space-x-4">
        <span className="h-px w-16 md:w-24 bg-pink-300"></span>
        <img
          src={decorationImg}
          alt="decoration"
          className="w-32 md:w-40 animate-pulse"
        />
        <span className="h-px w-16 md:w-24 bg-pink-300"></span>
      </div>

      <div className="relative max-w-4xl mx-auto mt-12">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 hidden md:block"></div>

        <div className="space-y-12">
          {steps.map((step, index) => {
            const isRight = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 relative ${
                  isRight ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Box */}
                <div className="md:w-1/2 px-4 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#3b2e1d]">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-pink-600 font-bold mt-1">
                    TIMING: {step.time}
                  </p>
                  <p className="text-sm md:text-base mt-2 text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Dot */}
                <div className="w-4 h-4 bg-[#3b2e1d] rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 md:static md:translate-x-0 md:translate-y-0"></div>

                {/* Image */}
                <div className="md:w-1/2 flex justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
