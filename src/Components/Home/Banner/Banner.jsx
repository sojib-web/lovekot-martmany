import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import img1 from "../../../assets/banner/banner.jpg";
import img2 from "../../../assets/banner/ban-bg.jpg";
import leftImage from "../../../assets//banner/5.png";
import rightImage from "../../../assets//banner/8.png";

const backgrounds = [img1, img2];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Animated Background */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${backgrounds[current]})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center text-white px-4 z-10">
        {/* Top-left Leaf */}
        <motion.img
          // src={leftImage}
          // alt="leaf left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-0 left-0 w-28 md:w-36"
        />

        {/* Bottom-right Leaf */}
        <motion.img
          // src={rightImage}
          // alt="leaf right"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute bottom-0 right-0 w-28 md:w-36"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10 z-20"
        >
          <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
            #1 MATRIMONY
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-3">
            Find your <span className="text-red-500">Right Match</span> here
          </h1>
          <p className="text-lg md:text-xl">
            Most trusted Matrimony Brand in the World.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-black bg-opacity-40 p-4 md:p-6 rounded-md flex flex-wrap gap-4 justify-center items-center w-full max-w-5xl z-20"
        >
          <select className="px-4 py-2 rounded-md bg-white text-black">
            <option>I'm looking for</option>
            <option>Male</option>
            <option>Female</option>
          </select>
          <select className="px-4 py-2 rounded-md bg-white text-black">
            <option>Age</option>
            <option>18-25</option>
            <option>26-35</option>
            <option>36+</option>
          </select>
          <select className="px-4 py-2 rounded-md bg-white text-black">
            <option>Religion</option>
            <option>Islam</option>
            <option>Hindu</option>
            <option>Christian</option>
          </select>
          <select className="px-4 py-2 rounded-md bg-white text-black">
            <option>Location</option>
            <option>Dhaka</option>
            <option>Chattogram</option>
            <option>Rangpur</option>
          </select>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-md font-semibold">
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
