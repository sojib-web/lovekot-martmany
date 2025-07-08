import React from "react";
import CountUp from "react-countup";
import { FaHeart, FaUsers, FaMale, FaFemale } from "react-icons/fa";

const stats = [
  {
    icon: <FaHeart className="text-brown-700 text-xl" />,
    value: 2000,
    suffix: "K",
    label: "COUPLES PAIRED",
    displayValue: 2,
  },
  {
    icon: <FaUsers className="text-brown-700 text-xl" />,
    value: 4000,
    suffix: "+",
    label: "REGISTERENTS",
    displayValue: 4000,
  },
  {
    icon: <FaMale className="text-brown-700 text-xl" />,
    value: 1600,
    suffix: "+",
    label: "MENS",
    displayValue: 1600,
  },
  {
    icon: <FaFemale className="text-brown-700 text-xl" />,
    value: 2000,
    suffix: "+",
    label: "WOMENS",
    displayValue: 2000,
  },
];

const SuccessCounter = () => {
  return (
    <section className="bg-[#fffdf7] border-t border-b border-[#d1cfc7] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center divide-x divide-[#d1cfc7]">
        {stats.map((item, index) => (
          <div key={index} className="px-4 py-6">
            <div className="flex justify-center items-center mb-2">
              <div className="border border-[#d1cfc7] rounded p-2">
                {item.icon}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#5e3b17]">
              <CountUp
                start={0}
                end={item.displayValue}
                duration={2}
                separator=","
              />
              {item.suffix}
            </h3>
            <p className="text-xs text-[#5e3b17] mt-1 tracking-wide">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessCounter;
