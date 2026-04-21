import React from 'react';
import Image from 'next/image';
import { FaPlay, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

interface AboutUsProps {}

const AboutUs: React.FC<AboutUsProps> = () => {
  return (
    <section className="bg-[#080808] w-full border-y border-white/10">
      <div className="max-w-screen-2xl w-full mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* Left Column: Text Content & View More Button */}
         <div className="lg:w-1/2 w-full lg:pr-8 self-start">
  <h1 className="text-3xl sm:text-5xl text-gradient font-black uppercase tracking-wider  mb-3">
    About Us
  </h1>
  <p className="text-xl sm:text-2xl font-bold text-white mb-6 leading-tight">
    PROVIDING RELIABLE CAR EXCHANGE SERVICES
  </p>
  <p className="text-neutral-300 leading-relaxed mb-4">
    At Nepal Motors, we offer a trusted platform for individuals to exchange their cars in a hassle-free and transparent way. Whether you’re looking to upgrade to a newer model or simply switch vehicles, we make the entire process smooth and efficient.
  </p>
  <p className="text-neutral-300 leading-relaxed mb-10">
    Our dedicated team ensures that every car exchange meets the highest standards of quality and reliability. We provide personalized support, clear communication, and competitive offers to make your car exchange experience seamless and rewarding.
  </p>

  {/* View More Button - Replaces the icons and signature */}
  <Link href={'/about'}
    className="lux-button group inline-flex items-center gap-3 font-bold py-4 px-8 rounded-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100/20"
    aria-label="View more about our car rentals"
  >
    <span>View More</span>
    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
  </Link>
</div>


          {/* Right Column: Image with Play Button */}
          <div className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <div className="relative">
              <Image
                src="https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-s500-4matic-123-1642184026.jpg?crop=0.458xw:0.387xh;0.316xw,0.418xh&resize=1200:*" 
                alt="Happy customer driving a rental car"
                width={800}
                height={800}
                className="rounded-lg object-cover w-full h-full shadow-2xl border border-white/10"
              />
              {/* Play Button Overlay */}
              <button
                className="absolute top-8 -left-4 sm:-left-6 w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-xl hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-transform duration-300 hover:scale-110"
                aria-label="Play video about our services"
              >
                <FaPlay className="text-2xl" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
