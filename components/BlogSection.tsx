// src/components/BlogSection.tsx

import React from 'react';
import Image from 'next/image';

// A helper component for the Calendar icon
const CalendarIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5"
    />
  </svg>
);

// TypeScript interface for a blog post
interface BlogPost {
  id: number;
  category: {
    name: string;
    color: string;
  };
  imageUrl: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  date: string;
  cardBgColor: string;
  readMoreColor: string;
}

// Dummy data with a Nepali Motor theme
const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: { name: 'Rent Tips', color: 'bg-red-500' },
    // Placeholder image. Replace with your own.
    imageUrl: '/offroadinghimalayas.jpg',
    title: 'A Guide to Renting the Perfect car for Your Himalayan Adventure',
    excerpt: 'Planning a trip to the mountains? Here are essential tips for choosing, inspecting, and renting a reliable car in Nepal to ensure a safe and memorable journey.',
    author: { name: 'Sunil Gurung', avatarUrl: 'https://i.pravatar.cc/150?u=prajwolshrestha' },
    date: '10 March 2024',
    cardBgColor: 'bg-white',
    readMoreColor: 'text-orange-500 hover:text-orange-600',
  },
  {
    id: 2,
    category: { name: 'News', color: 'bg-slate-800' },
    // Placeholder image. Replace with your own.
    imageUrl: '/suvcar.jpg',
    title: 'Top 5 Family-Friendly SUVs for Navigating Kathmandu\'s Streets',
    excerpt: 'From handling challenging road conditions to providing comfort for the whole family, we review the best SUVs available for purchase or rent in the valley.',
    author: { name: 'Anjali Thapa', avatarUrl: 'https://i.pravatar.cc/150?u=anjalithapa' },
    date: '12 March 2024',
    cardBgColor: 'bg-slate-50',
    readMoreColor: 'text-gray-500 hover:text-gray-700',
  },
{
    id: 3,
    category: { name: 'Automotive', color: 'bg-indigo-800' },
    imageUrl: '/evcarsinnepal.jpg',
    title: 'The Rise of Electric Vehicles in Nepal: What You Need to Know',
    excerpt: 'With growing environmental concerns, EV adoption is gaining momentum in Nepal. We explore the challenges, benefits, and the future of electric cars in the country.',
    author: { name: 'Pooja Sharma', avatarUrl: 'https://i.pravatar.cc/150?u=poojasharma' },
    date: '25 July 2024',
    cardBgColor: 'bg-indigo-50',
    readMoreColor: 'text-indigo-500 hover:text-indigo-700',
}

];

const BlogSection = () => {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-foreground sm:text-4xl">
            Our Recently Post
          </h2>
          <p className="font-semibold text-[#f4c430] uppercase tracking-[0.2em]">
            Blog & News
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-line bg-surface shadow-sm shadow-black/10 overflow-hidden flex flex-col transition hover:border-[#f4c430]/50"
            >
              <div className="relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={600}
                  className="w-full h-72 object-cover"
                />
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-white text-xs font-semibold rounded-md ${post.category.color}`}
                >
                  {post.category.name}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold uppercase text-foreground">
                  {post.title}
                </h3>
                <p className="mt-2 text-muted text-sm leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-4 border-t border-line">
                  <div className="flex justify-between items-center text-xs text-muted">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="font-semibold text-[#f4c430] transition-colors hover:text-[#ffdf70]"
                    >
                      Read More —
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Discover More" Button */}
        {/* <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-sm font-semibold text-gray-600 shadow-sm hover:bg-gray-300 transition-colors"
          >
            Discover More Blog —
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default BlogSection;
