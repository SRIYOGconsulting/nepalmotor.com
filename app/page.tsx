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

export default function CarShowcase(): JSX.Element {
  return (
    <div className="w-full bg-background text-foreground">
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
