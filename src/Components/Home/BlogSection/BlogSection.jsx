// @ts-nocheck
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import decorationImg from "../../../assets/banner/1.png";

const blogPosts = [
  {
    id: 1,
    category: "WEDDING PLANNING",
    title: "10 Essential Tips to Plan Your Dream Wedding",
    description:
      "From budgeting to venue selection, discover the must-know tips to make your wedding day stress-free and unforgettable.",
    image: "https://i.ibb.co/678LkXkb/image.png",
  },
  {
    id: 2,
    category: "RELATIONSHIP ADVICE",
    title: "How to Build Trust in a New Relationship",
    description:
      "Trust is the foundation of every successful relationship. Here are proven ways to nurture and strengthen it.",
    image: "https://i.ibb.co/BHyZqrw0/image.png",
  },
  {
    id: 3,
    category: "SUCCESS STORY",
    title: "Rina & Arif’s LoveKnot Journey",
    description:
      "A heartwarming story of how two people found each other through LoveKnot and started a lifelong journey together.",
    image: "https://i.ibb.co/NgqKMf36/image.png",
  },
  {
    id: 4,
    category: "SUCCESS STORY",
    title: "Shila & Hasan’s Beautiful Beginning",
    description:
      "Another inspiring story of two hearts finding each other through LoveKnot.",
    image: "https://i.ibb.co/tTP4CP6w/image.png",
  },
  {
    id: 5,
    category: "SUCCESS STORY",
    title: "Ayesha & Rafiq’s Journey of Love",
    description:
      "Their story proves that true love knows no boundaries when it comes to destiny.",
    image: "https://i.ibb.co/6JXnF0pq/image.png",
  },
  {
    id: 6,
    category: "WEDDING PLANNING",
    title: "Top 5 Destination Wedding Locations",
    description:
      "Dreaming of a wedding abroad? Explore the most romantic places around the world to tie the knot.",
    image: "https://i.ibb.co/MD5hhw69/image.png",
  },
  {
    id: 7,
    category: "RELATIONSHIP ADVICE",
    title: "Effective Communication in Relationships",
    description:
      "Learn how open and honest communication can strengthen your bond with your partner.",
    image: "https://i.ibb.co/C5hnrVpb/image.png",
  },
  {
    id: 8,
    category: "RELATIONSHIP ADVICE",
    title: "Balancing Career and Love Life",
    description:
      "Struggling to give time to both? Here’s how you can manage career growth without losing love.",
    image: "https://i.ibb.co/HD7qXx6z/image.png",
  },
  {
    id: 9,
    category: "WEDDING PLANNING",
    title: "Creative Wedding Decor Ideas",
    description:
      "Add magic to your special day with these trending and budget-friendly wedding decor inspirations.",
    image: "https://i.ibb.co/0jnyZ7d1/image.png",
  },
  {
    id: 10,
    category: "SUCCESS STORY",
    title: "Farhan & Meera’s Happily Ever After",
    description:
      "Read the magical journey of two strangers who found each other through LoveKnot.",
    image: "https://i.ibb.co/7dT8vbqs/image.png",
  },
];
export default function BlogSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#fdf9f3]">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16 px-4 md:px-0">
        <p className="uppercase tracking-widest text-[16px] sm:text-[18px] text-[#9c774a] font-[cursive] mb-2">
          Blog Posts
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#4c2e05] font-serif leading-tight">
          LoveKnot Insights & Stories
        </h2>

        <div className="flex items-center justify-center mt-6 space-x-4">
          <span className="h-px w-16 md:w-24 bg-pink-300"></span>
          <img
            src={decorationImg}
            alt="decoration"
            className="w-24 sm:w-32 md:w-40 animate-pulse"
          />
          <span className="h-px w-16 md:w-24 bg-pink-300"></span>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 ">
                {/* Image */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 sm:p-6">
                  <p className="text-white text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1">
                    {post.category}
                  </p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm mt-2 line-clamp-3">
                    {post.description}
                  </p>
                  <button className="mt-4 px-4 sm:px-6 py-2 bg-pink-500 text-white text-xs sm:text-sm uppercase font-semibold rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300">
                    Read More
                  </button>
                </div>

                {/* Decorative bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-pink-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
