import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router"; // ✅ Correct import
import img1 from "../../../assets/banner/Work/1.jpg";
import img2 from "../../../assets/banner/Work/2.jpg";
import img3 from "../../../assets/banner/Work/3.jpg";

const slides = [
  {
    id: 1,
    img: img1,
    heading: "Find Your Perfect Match",
    text: "Your soulmate is just a few clicks away. Begin your journey today with confidence and trust.",
  },
  {
    id: 2,
    img: img2,
    heading: "Connect with Verified Profiles",
    text: "Every profile is manually verified to ensure authenticity and safety for our valued users.",
  },
  {
    id: 3,
    img: img3,
    heading: "Begin Your Love Journey Today",
    text: "Browse profiles that match your preferences and start a conversation that matters.",
  },
];

function Banner() {
  return (
    <div className="w-full h-[75vh] relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[75vh]">
              {/* Background image */}
              <img
                src={slide.img}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover"
              />

              {/* Gradient & Blur Overlay */}
              <div className="absolute inset-0  bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-6 md:px-10">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-snug">
                    {slide.heading.split(" ").map((word, i) =>
                      i === 2 ? (
                        <span key={i} className="text-rose-400 font-bold">
                          {" " + word + " "}
                        </span>
                      ) : (
                        <span key={i}>{" " + word + " "}</span>
                      )
                    )}
                  </h1>
                  <p className="text-base md:text-xl text-gray-200 mb-8">
                    {slide.text}
                  </p>
                  <Link to="/biodatas">
                    <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 transition-all text-white font-semibold px-8 py-3 rounded-full shadow-lg">
                      Browse Biodatas
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
