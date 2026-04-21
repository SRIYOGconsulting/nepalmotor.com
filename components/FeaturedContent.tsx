import Image from 'next/image';
import React from 'react';
import LogoScroller from './LogoScroller';
import Link from 'next/link';

const FeaturedContent: React.FC = () => {
  return (
    <div className='w-full bg-[#080808]'>
    <div className="w-full max-w-screen-2xl mx-auto px-2 md:px-6 lg:px-8 py-10"> {/* Optional: bg-gray-50 for contrast */}
      {/* Featured In Section */}
      <section className="mb-12 md:mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black uppercase text-white mb-8">
          Featured In
        </h2>
        <div className="flex justify-center items-center px-4">
          {/* Single image for all logos */}
          {/* <Image
            src={'/featuredImage/featuredLogos.png'} 
            alt="Featured publications logos"
            width={1200}
            height={60}
            className="object-contain w-full h-auto max-w-4xl"
          /> */}
          <LogoScroller />
        </div>
      </section>

      {/* Car Price in Nepal Section */}
      <section className="bg-[#101010] border border-white/10 rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Content Area */}
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 lg:w-1/2 flex flex-col justify-center">
            <p className="text-sm text-neutral-400 mb-1 uppercase tracking-[0.2em]">Nepal Motor News</p>
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-white mb-3">
              Car Prices in Nepal
            </h3>
            <p className="text-neutral-300 mb-6 text-base md:text-lg">
              How will car prices in Nepal affect your next purchase?
              Our experts explain everything you need to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={'/readMore'}
                className="px-6 py-3 border cursor-pointer border-white/25 text-white font-semibold rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors duration-150 ease-in-out w-full sm:w-auto"
              >
                Read More
              </Link>
              <Link
                href="/exchange"
                className="lux-button px-6 py-3 cursor-pointer font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 w-full sm:w-auto"
              >
                Exchange To Ev
              </Link>
            </div>
          </div>

          {/* Right Image Area - Simplified */}
          <div className="lg:w-1/2 relative flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-0 min-h-[200px] sm:min-h-[250px] lg:min-h-0 bg-[#151515] lg:bg-transparent">
            {/* Car Image Placeholder */}
            <div className="relative z-10 w-full h-full max-w-md lg:max-w-lg">
             
              <Image
                src={'/featuredImage/inclinedCar.png'} 
                alt="Car" 
                width={800} 
                height={500} 
                className="object-cover md:object-contain w-full h-full"
                priority 
              />
            </div>
            
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default FeaturedContent;
