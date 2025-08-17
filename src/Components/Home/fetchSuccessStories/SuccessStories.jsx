/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import decorationImg from "../../../assets/banner/1.png";
import useAxios from "../../../hooks/useAxios";

// Fetch success stories using Axios
const fetchSuccessStories = async () => {
  const axiosInstance = useAxios();
  const response = await axiosInstance.get("/api/success-stories");
  return response.data;
};

const SuccessStories = () => {
  const {
    data: successStories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["success-stories"],
    queryFn: fetchSuccessStories,
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        Error loading success stories!
      </div>
    );

  const sortedStories = successStories.sort(
    (a, b) => new Date(b.marriedDate) - new Date(a.marriedDate)
  );

  return (
    <section className="py-16 bg-[#fefaf4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#4c2e05]">
            💍 Success Stories
          </h2>
          <p className="text-base md:text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
            Real couples. Real love. Read how our platform changed lives.
          </p>
        </div>

        {/* Decorative Line */}
        <div className="flex items-center justify-center mt-6 space-x-3 md:space-x-6">
          <span className="h-px w-12 md:w-24 bg-pink-300"></span>
          <img
            src={decorationImg}
            alt="decoration"
            className="w-24 md:w-36 animate-pulse"
          />
          <span className="h-px w-12 md:w-24 bg-pink-300"></span>
        </div>

        {/* Swiper Slider */}
        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {sortedStories.map((story) => (
              <SwiperSlide key={story._id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col">
                  <div className="p-6 flex flex-col items-center bg-gradient-to-br from-[#fffaf1] to-[#fbeee3] flex-grow">
                    <img
                      src={story.coupleImage}
                      alt="Couple"
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-yellow-400 shadow-md"
                    />
                    <div className="text-center mt-4">
                      <p className="text-xs md:text-sm text-gray-500 mb-1">
                        Married on {formatDate(story.marriedDate)}
                      </p>
                      <div className="flex justify-center gap-1 mb-2">
                        {renderStars(story.rating)}
                      </div>
                      <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed italic line-clamp-4">
                        “
                        {story.successStory.length > 140
                          ? story.successStory.slice(0, 140) + "..."
                          : story.successStory}
                        ”
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
