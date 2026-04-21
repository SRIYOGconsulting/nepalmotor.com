import React from "react";
import Image from "next/image";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

const StarIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.592 2.855c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z"
      clipRule="evenodd"
    />
  </svg>
);

const testimonialsData = [
  {
    id: 1,
    name: "Alex Rai",
    role: "Adventure Rider",
    quote:
      "Renting a Royal Enfield for my trip to Mustang was the best decision. The bike was in perfect condition, and the team provided excellent support. Unforgettable views and a reliable ride!",
    rating: 5.0,
    imageUrl: "https://i.pravatar.cc/150?u=alexrai",
    bgColor: "bg-[#121212]",
    shadow: "shadow-xl",
    roleColor: "text-[#f4c430]",
  },
  {
    id: 2,
    name: "Pratik Kc",
    role: "Lawyer & Commuter",
    quote:
      "We bought our first family SUV from them. The process was smooth, transparent, and they helped us find the perfect vehicle for Kathmandu's roads. Highly recommended for their professional service.",
    rating: 5.0,
    imageUrl: "https://i.pravatar.cc/150?u=girl",
    bgColor: "bg-[#171717]",
    shadow: "shadow-lg",
    roleColor: "text-neutral-400",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#080808] w-full pt-10 pb-10 sm:pb-20">
      <div className="max-w-screen-2xl w-full mx-auto px-6 lg:px-8">
        <h1 className="text-center pb-10 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Testimonials
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Content */}
          <div className="text-center lg:text-left self-start">
            <h2 className="mt-2 text-1xl font-bold tracking-tight text-gradient sm:text-2xl">
              Reviewed by Our Clients
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Discover why our customers trust us for their automotive needs in
              Nepal. From rugged mountain adventures to daily city commutes, we
              deliver reliability and quality service.
            </p>
            <div className="mt-10">
              <Link
                href="/testimonials"
                className="lux-button inline-block rounded-md px-8 py-4 text-base font-semibold group shadow-sm transition-all duration-500 transform hover:-translate-y-1 ease-out "
              >
                Discover More{" "}
                <MoveRightIcon className="inline-block ml-2 group-hover:translate-x-1 transition-all duration-400" />
              </Link>
            </div>
          </div>

          {/* Right Column: Testimonial Cards */}
          <div className="space-y-8">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`${testimonial.bgColor} ${testimonial.shadow} rounded-xl border border-white/10 p-8`}
              >
                <div className="flex items-start gap-4">
                  <Image
                    className="h-14 w-14 rounded-full object-cover"
                    src={testimonial.imageUrl}
                    alt={`Photo of ${testimonial.name}`}
                    width={56}
                    height={56}
                  />
                  <div>
                    <p className="text-lg font-bold text-white">
                      {testimonial.name}
                    </p>
                    <p
                      className={`text-sm font-medium ${testimonial.roleColor}`}
                    >
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="mt-6 text-neutral-300 italic">
                  <p>"{testimonial.quote}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-2">
                  <div className="flex">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-neutral-300">
                    {testimonial.rating.toFixed(1)} / 5.0
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
