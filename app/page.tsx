import AdBanner from '@/components/AdBanner';
import CartTabs from '@/components/CartTabs';
import FeaturedContent from '@/components/FeaturedContent';
import HeroSection from '@/components/HeroSection';
import LatestNews from '@/components/LatestNews';
import SearchSection from '@/components/SearchSection';
import React from 'react';
import { JSX } from 'react';
import NewArrivalCars from '@/components/NewArrivalCars';
import StatsSection from '@/components/StatsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import AboutUs from '@/components/About';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';

type Car = {
  name: string;
  image: string;
};

const cars: Car[] = [
  { name: 'Deepal S07', image: '/heropageImage/deepsai.png' },
  { name: 'Hyundai Kona', image: '/heropageImage/hyundia.png' },
  { name: 'TATA Nexon Ev', image: '/heropageImage/tata.png' },
  { name: 'Mercedes-Benz G-Class', image: '/heropageImage/mercedies.png' },
];

export default function CarShowcase(): JSX.Element {
  return (
    <div className="w-full bg-[#070707] text-white">
      {/* Hero Section */}
      <HeroSection />
      {/* stats section */}
      <StatsSection />
       {/* About Us Section */}
      <AboutUs />
      {/* car research and type search */}
      <SearchSection />
        {/* Car Compare */}
        <NewArrivalCars />
        {/* sponsored Section */}
        <AdBanner/>
      {/* featured Section */}
      <FeaturedContent/>
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* Car Tabs */}
        <CartTabs />
      {/* Testimonials Section */}
      <Testimonials />
      {/* latest new section */}
      <LatestNews/>
      {/* blog section */}
      <BlogSection /> 
    </div>
  );
}
