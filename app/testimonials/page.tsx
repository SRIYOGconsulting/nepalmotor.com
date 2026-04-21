// app/testimonials/page.tsx - Next.js App Router page component with Tailwind CSS and TypeScript
"use client";

import React from "react";
import Link from "next/link";

interface Testimonial {
  id: number;
  text: string;
  author: string;
  image: string;
  rating: number;
}

interface StarRatingProps {
  rating: number;
}

const TestimonialsPage: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The EV car was fresh and clean. Battery full cha and drive bilkul smooth. Dhanyabad!",
      author: "Sita Joshi",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 4,
    },
    {
      id: 2,
      text: "Booking easy bho, car ready on time. Noise nai chaina while driving—very good service!",
      author: "Milan Raut",
      image: "https://i.pravatar.cc/150?img=2",
      rating: 4,
    },
    {
      id: 3,
      text: "I drove to Pokhara without tension. Charge lasted long. Ramro experience overall.",
      author: "Elina Chhetri",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
    },
    {
      id: 4,
      text: "Staff explained sabai features clearly. Car smooth cha—highly recommend gare!",
      author: "Dipesh Thapa",
      image: "https://i.pravatar.cc/150?img=4",
      rating: 4,
    },
    {
      id: 5,
      text: "First time EV drive gare but it was simple. Seats comfy and range thik cha.",
      author: "Anita Lama",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 4,
    },
    {
      id: 6,
      text: "Price pocket‑friendly thiyo and car new thiye. Dhanyabad team for great support.",
      author: "Jivan Wagle",
      image: "https://i.pravatar.cc/150?img=14",
      rating: 3,
    },
    {
      id: 7,
      text: "Charging cable pani provide gareko so no tension at all. Good job, team!",
      author: "Sandesh Gurung",
      image: "https://i.pravatar.cc/150?img=15",
      rating: 5,
    },
    {
      id: 8,
      text: "Pickup‑drop easy cha. App bata sabai info paincha. Sasto ani reliable service.",
      author: "Rachana Bhattarai",
      image: "https://i.pravatar.cc/150?img=16",
      rating: 4,
    },
    {
      id: 9,
      text: "We rented two EVs for family trip. Kids loved quiet ride; battery last gariyo.",
      author: "Pravin Shrestha",
      image: "https://i.pravatar.cc/150?img=17",
      rating: 5,
    },
    {
      id: 10,
      text: "Car was sanitized properly—safety first vayo. Ramro lagiyo, will book again.",
      author: "Kusum Pandey",
      image: "https://i.pravatar.cc/150?img=18",
      rating: 4,
    },
    {
      id: 11,
      text: "Range meter accurate cha. Reached Lumbini easily, dherai satisfied!",
      author: "Arjun Rawal",
      image: "https://i.pravatar.cc/150?img=19",
      rating: 5,
    },
    {
      id: 12,
      text: "Customer service replied quick. Charger issue solve bhayo instantly—thanks!",
      author: "Rina Karki",
      image: "https://i.pravatar.cc/150?img=20",
      rating: 3,
    },
    {
      id: 13,
      text: "Steering light cha, parking camera clear. City driving ekdum easy bho.",
      author: "Bibek Devkota",
      image: "https://i.pravatar.cc/150?img=21",
      rating: 4,
    },
    {
      id: 14,
      text: "Interior modern cha. Bluetooth connect garna easy, so music enjoyed all ride long.",
      author: "Sabina Magar",
      image: "https://i.pravatar.cc/150?img=22",
      rating: 4,
    },
    {
      id: 15,
      text: "Overall experience smooth like butter. Will book feri for sure!",
      author: "Nabin Rai",
      image: "https://i.pravatar.cc/150?img=23",
      rating: 5,
    },
  ];

  const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, index: number) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating ? "text-amber-300" : "text-[#E6E8EC]"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header - Deep Teal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#090909] py-16 px-4 sm:px-8 lg:px-16 border-b border-white/10">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#008080] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#004D40] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex space-x-2 text-sm font-medium w-full items-center justify-center">
            <Link
              href="/"
              className="text-[#008080] hover:text-[#004D40] transition-colors duration-200 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-400">testimonials</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#004D40] via-[#008080] to-[#00BCD4] bg-clip-text text-transparent">
                Customer Testimonials
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover what our valued customers have to say about their
              experience
            </p>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-5">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f4c430] mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Real feedback from real people who have experienced our
              exceptional service and products
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial: Testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* Top accent border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00F3FF] to-[#008080]"></div>

                {/* Quote icon */}
                <div className="text-5xl text-[#f4c430] opacity-70 mb-5 font-serif">
                  "
                </div>

                {/* Star Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Testimonial Text */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#f4c430] to-[#b89014] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img
                      src={testimonial.image}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {testimonial.author}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient from Dark Slate Green to Deep Teal */}
      <section className="bg-gradient-to-br from-[#111] to-[#0a0a0a] text-white py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Success Stories?
          </h3>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Experience the same exceptional service that our customers rave
            about
          </p>
          <button className="bg-[#f4c430] text-[#111] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#ffdf70] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
