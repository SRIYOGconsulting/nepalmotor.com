import { CarDetails } from "@/types";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type carCarouselProps = {
  cars: CarDetails[];
};

const CarCarousel = ({ cars }: carCarouselProps) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  // Delay rendering swiper until refs are ready
  useEffect(() => {
    setSwiperReady(true);
  }, []);
  const buttonBaseClass =
  "absolute z-10 top-1/3 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ease-in-out";
  
  
  return (
    <div className="relative  py-8">
      <div
        ref={prevRef}
        className="absolute z-10 -left-10 top-1/3  w-12 h-12 flex  items-center justify-center rounded-full bg-[#121212] shadow-lg border border-white/20 text-white hover:border-[#f4c430] hover:shadow-xl cursor-pointer transition transform hover:scale-110"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </div>

      <div
        ref={nextRef}
        className="absolute z-10 -right-10 top-1/3  w-12 h-12 flex items-center justify-center rounded-full bg-[#121212] shadow-lg border border-white/20 text-white hover:border-[#f4c430] hover:shadow-xl cursor-pointer transition transform hover:scale-110"
      >
        <ArrowRight className="w-5 h-5 text-white" />
      </div>
      {/* design on hover */}
      {/* <div
  ref={prevRef}
  className={`
    ${buttonBaseClass}
    -left-10
    // Style (subtle by default)
    bg-gray-900/0 text-gray-900/50 
    // Interaction (comes to life on hover)
    hover:bg-gray-900/100 hover:text-white hover:shadow-xl hover:scale-110
  `}
>
  <ArrowLeft className="w-5 h-5" />
</div>

<div
  ref={nextRef}
  className={`
    ${buttonBaseClass}
    -right-10
    // Style (subtle by default)
    bg-gray-900/0 text-gray-900/50
    // Interaction (comes to life on hover)
    hover:bg-gray-900/100 hover:text-white hover:shadow-xl hover:scale-110
  `}
>
  <ArrowRight className="w-5 h-5" />
</div> */}

      {swiperReady && (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false, // Keep autoplay even after user interaction
            pauseOnMouseEnter: true, // Optional: pause on hover for better UX
          }}
          onInit={(swiper: any) => {
            // Link navigation manually on init
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          //   speed={10000}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {cars.map((car, index) => (
            <SwiperSlide key={index} className="py-2">
              <div key={index} className="rounded-xl border border-white/10 bg-[#111] shadow-sm p-4 transition hover:border-[#f4c430]/50">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="mt-2 font-semibold text-white">{car.name}</h3>
                <p className="text-gray-400 ">{car.price}</p>
                <button className="mt-3 border cursor-pointer border-[#f4c430] text-[#f4c430] px-4 md:px-10 py-1 rounded-md hover:bg-[#f4c430] hover:text-black transition">
                  View May Offers
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default CarCarousel;
