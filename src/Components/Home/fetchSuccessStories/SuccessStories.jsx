/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading success stories!
      </div>
    );

  const sortedStories = successStories.sort(
    (a, b) => new Date(b.marriedDate) - new Date(a.marriedDate) // ✅ correct field
  );

  return (
    <section className=" mt-20 bg-[#fefaf4]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#4c2e05]">
            💍 Success Stories
          </h2>
          <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">
            Real couples. Real love. Read how our platform changed lives.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full">
                <div className="p-6 flex flex-col items-center bg-gradient-to-br from-[#fffaf1] to-[#fbeee3] h-[320px] justify-between">
                  <div className="flex flex-col items-center">
                    <img
                      src={story.coupleImage}
                      alt="Couple"
                      className="w-28 h-28 object-cover rounded-full border-4 border-yellow-400 shadow-md"
                    />
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500 mb-1">
                        Married on {formatDate(story.marriedDate)}
                      </p>
                      <div className="flex justify-center gap-1 mb-2">
                        {renderStars(story.rating)}
                      </div>
                      <p className="text-gray-700 text-[15px] leading-relaxed italic line-clamp-4">
                        “
                        {story.successStory.length > 140
                          ? story.successStory.slice(0, 140) + "..."
                          : story.successStory}
                        ”
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;
