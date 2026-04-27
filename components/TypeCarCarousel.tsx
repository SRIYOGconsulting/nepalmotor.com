import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowRight,ArrowLeft } from "lucide-react";

import { Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import SingleCarCard from "./SingleCarCard";

type CarListingCard = {
  _id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  transmission: string | null;
  variant: string | null;
  carType: string | null;
  primaryImageUrl: string | null;
};

type carCarouselProps={
    cars:CarListingCard[];
}

type SwiperNavApi = {
  params: { navigation: { prevEl: unknown; nextEl: unknown } };
  navigation: { init: () => void; update: () => void };
};

const TypeCarCarousel = ({cars}:carCarouselProps) => {
    const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  // Delay rendering swiper until refs are ready
  useEffect(() => {
    setSwiperReady(true);
  }, []);
  return (
        <div className="relative  py-2 md:py-8">
      {/* Custom Navigation Buttons */}
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


      {swiperReady && (
        <Swiper
          modules={[Navigation,Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,   // Keep autoplay even after user interaction
            pauseOnMouseEnter: true,       // Optional: pause on hover for better UX
          }}
          onInit={(swiper: unknown) => {
            const s = swiper as SwiperNavApi;
            s.params.navigation.prevEl = prevRef.current;
            s.params.navigation.nextEl = nextRef.current;
            s.navigation.init();
            s.navigation.update();
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
               {/* <CarCard  /> */}
               <SingleCarCard car={car} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default TypeCarCarousel
