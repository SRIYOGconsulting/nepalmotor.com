import React from "react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Prakash Upreti",
    role: "C.T.O",
    imageUrl: "/teamImage/prakash_upreti.png",
  },
  {
    name: "Niranjan Sharma",
    role: "Project Manager",
    imageUrl: "/teamImage/niranjan_sharma.png",
  },
  {
    name: "Rohan Upreti",
    role: "Web Developer",
    imageUrl: "/teamImage/rohan_upreti.png",
  },
  {
    name: "Prajwol Shrestha",
    role: "Web Developer",
    imageUrl: "/teamImage/prajwol_shrestha.png",
  },
];

const services = [
  {
    name: "Trusted Vehicle Listings",
    description:
      "The largest selection of new and used cars and bikes from verified sellers across Nepal.",
    icon: "V",
  },
  {
    name: "Verified Dealer Network",
    description:
      "We partner with hundreds of trusted showrooms to ensure quality and reliability.",
    icon: "D",
  },
  {
    name: "Easy Financing Solutions",
    description:
      "Connect with our partner banks to get transparent and competitive loan offers.",
    icon: "F",
  },
  {
    name: "Expert Reviews & News",
    description:
      "Stay updated with the latest in the Nepali auto scene with our unbiased reviews and articles.",
    icon: "R",
  },
];

const achievements = [
  { number: "50,000+", label: "Vehicles Listed" },
  { number: "500+", label: "Trusted Dealers" },
  { number: "100,000+", label: "Happy Customers" },
  { number: "77", label: "Districts Covered" },
];

const IconPlaceholder = ({ character }: { character: string }) => (
  <div
    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-white"
    style={{ backgroundColor: "#008080" }}
  >
    <span className="text-2xl font-bold">{character}</span>
  </div>
);

export default function AboutPage() {
  return (
    <main className={`bg-[#080808] text-gray-100 mx-auto w-full`}>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#131313] to-[#0b0b0b] py-16 px-4 sm:px-8 lg:px-16 border-b border-white/10">
        {/* <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#008080] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#004D40] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div> */}

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
            <span className="text-gray-400">About</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#004D40] via-[#008080] to-[#00BCD4] bg-clip-text text-transparent">
                About-us
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Discover the story behind Nepal's most trusted automotive
              marketplace and the passionate team driving innovation in the
              industry.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#008080] to-[#00BCD4] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f4c430] mb-2">
                Est. 2018
              </h3>
              <p className="text-gray-300 text-sm">
                Leading the digital transformation of Nepal's automotive
                industry
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#008080] to-[#00BCD4] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f4c430] mb-2">
                100k+ Users
              </h3>
              <p className="text-gray-300 text-sm">
                Trusted by thousands of customers across all 77 districts
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#008080] to-[#00BCD4] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#f4c430] mb-2">
                500+ Dealers
              </h3>
              <p className="text-gray-300 text-sm">
                Verified network of trusted automotive professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative overflow-hidden"
        style={{ backgroundColor: "#0b0b0b" }}
      >
        <div
          className="absolute inset-0 transform -skew-y-1 origin-top-left"
          style={{ backgroundColor: "#121212" }}
        ></div>
        <div className="relative z-10 px-4 py-24 sm:py-32">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Nepal's Auto
                  <span className="block" style={{ color: "#00F3FF" }}>
                    Revolution
                  </span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100">
                  Transforming how Nepal buys, sells, and experiences vehicles
                  since 2018.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a
                    className="px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ backgroundColor: "#00F3FF", color: "#004D40" }}
                    href="#mission"
                  >
                    Our Story
                  </a>
                  <a
                    href="#team"
                    className="px-8 py-4 rounded-2xl text-lg font-semibold border-2 text-white transition-all duration-300 hover:bg-[#00F3FF] hover:text-[#004D40]"
                    style={{ borderColor: "#00F3FF" }}
                  >
                    Meet the Team
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-96 overflow-hidden shadow-2xl transform rotate-3 rounded-3xl hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/hero-car-image1.jpg"
                    alt="Nepal Motor Office"
                    fill
                    className="object-cover rounded-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "#080808" }}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-bold mb-2"
                  style={{ color: "#008080" }}
                >
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Mission & Story Section */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "#0d0d0d" }}
        id="mission"
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Mission & Story
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Founded in 2018 in the heart of Kathmandu, Nepal Motor was born from
            a simple idea: to make buying and selling vehicles in Nepal simple,
            transparent, and trustworthy. We saw a fragmented market where good
            information was scarce and navigating the process was a challenge.
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            Today, we are Nepal's leading digital automotive marketplace,
            connecting thousands of buyers with a trusted network of sellers
            from the Himalayan highlands to the Terai plains. Our mission is to
            empower every Nepali with the data, tools, and connections they need
            to find their perfect vehicle with confidence.
          </p>
        </div>
      </section>

      {/* 3. Team Section (Our People) */}
      <section className="bg-[#090909] py-16 sm:py-24" id="team">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Meet Our People
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              The dedicated team committed to revolutionizing Nepal's auto
              industry.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((person) => (
              <div
                key={person.name}
                className="flex flex-col items-center rounded-lg p-6 text-center shadow-md transition-transform hover:scale-105 border border-white/10"
                style={{ backgroundColor: "#111" }}
              >
                <Image
                  className="h-24 w-24 rounded-full"
                  src={person.imageUrl}
                  alt={`Portrait of ${person.name}`}
                  width={96}
                  height={96}
                />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {person.name}
                </h3>
                <p className="text-lg font-medium" style={{ color: "#008080" }}>
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Ecosystem Section */}
      <section
        className="py-16 sm:py-24"
        style={{ backgroundColor: "#0d0d0d" }}
      >
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Our Ecosystem
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              A complete solution for your vehicle journey.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            {services.map((service) => (
              <div key={service.name} className="flex items-start space-x-4">
                <IconPlaceholder character={service.icon} />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-base text-gray-300">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call to Action (CTA) Section */}
      <section style={{ backgroundColor: "#080808" }}>
        <div className="container mx-auto px-4 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Our Journey
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-100">
            Help us build the future of the automotive industry in Nepal.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#"
              className="w-full rounded-md px-6 py-3 text-base font-semibold shadow-sm transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              style={{
                backgroundColor: "#00F3FF",
                color: "#004D40",
              }}
            >
              View Careers
            </a>
            <Link
              href="/contact"
              className="w-fit rounded-md border px-6 py-3 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#00F3FF] hover:text-[#004D40]"
              style={{ borderColor: "#00F3FF" }}
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
