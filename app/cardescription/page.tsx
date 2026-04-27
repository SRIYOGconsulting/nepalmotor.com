"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Car,
} from "lucide-react";

interface Car {
  title: string;
  type: string;
  color: string;
  km: number;
  fuel: string;
  transmission: string;
  city: string;
  price: string;
  icon: string;
  year: number;
  engine: string;
  description: string;
  features: string[];
  condition: string;
  sellerName: string;
  sellerPhone: string;
  images: string[];
}

const carData: Car = {
  title: "2019 Toyota Corolla",
  type: "Sedan",
  color: "White",
  km: 45000,
  fuel: "Petrol",
  transmission: "Automatic",
  city: "Kathmandu",
  price: "NPR 35,00,000",
  icon: "/carTypeImage/hyundai-i22.png",
  year: 2019,
  engine: "1.8L 4-Cylinder",
  condition: "Excellent",
  sellerName: "Ram Sharma",
  sellerPhone: "+977-9812345678",
  description:
    "Well-maintained Toyota Corolla in excellent condition. Single owner, regularly serviced at authorized Toyota service center. Perfect for city driving and long trips. All documents are clear and ready for transfer.",
  features: [
    "Air Conditioning",
    "Power Steering",
    "Electric Windows",
    "Central Locking",
    "ABS Brakes",
    "Airbags",
    "Music System",
    "Alloy Wheels",
  ],
  images: [
    "/carTypeImage/hyundai-i22.png",
    "/carTypeImage/tata-nexon-ev.png",
    "/carTypeImage/suzuki-brezza.png",
    "/carTypeImage/hyundai-creta.png",
  ],
};

const CarDetailsPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Header with background */}
      <section className="relative overflow-hidden border-b border-white/10 py-8 px-4 sm:px-8 lg:px-16 bg-[#080808]">
        <div className="absolute inset-0 opacity-40">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 bg-[#f4c430]/10"
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 bg-white/5"
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            <Link
              href="/"
              className="flex items-center transition-colors duration-200 hover:text-white"
            >
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link
              href="/cars"
              className="transition-colors duration-200 hover:text-white"
            >
              Cars For Sale
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-neutral-300">{carData.title}</span>
          </nav>

          {/* Car Title and Actions */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1
                className="mb-2 text-3xl font-black tracking-tight text-white md:text-4xl"
              >
                {carData.title}
              </h1>
              <div className="flex items-center space-x-4 text-neutral-300">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#f4c430]" />
                  {carData.city}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#f4c430]" />
                  {carData.year}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-3 md:mt-0">
              <button className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/55 p-3 text-white/80 backdrop-blur-md transition hover:border-[#f4c430]/70 hover:text-white">
                <Share2 className="h-5 w-5 text-[#f4c430]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images and Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B0B0B] shadow-2xl shadow-black/40">
              <div className="flex aspect-video items-center justify-center bg-black/40">
                <img
                  src={carData.images[currentImageIndex]}
                  alt={carData.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="border-t border-white/10 p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {carData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 h-16 w-20 overflow-hidden rounded-xl border transition ${
                        currentImageIndex === index
                          ? "border-[#f4c430]/70"
                          : "border-white/15 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${carData.title} view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Car Specifications */}
            <div className="rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 shadow-2xl shadow-black/40">
              <h2
                className="mb-6 text-2xl font-black uppercase tracking-widest text-white"
              >
                Car Specifications
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Car className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Type
                    </p>
                    <p className="font-semibold text-white">{carData.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Palette className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Color
                    </p>
                    <p className="font-semibold text-white">{carData.color}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Gauge className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Mileage
                    </p>
                    <p className="font-semibold text-white">
                      {carData.km.toLocaleString()} km
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Fuel className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Fuel Type
                    </p>
                    <p className="font-semibold text-white">{carData.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Transmission
                    </p>
                    <p className="font-semibold text-white">
                      {carData.transmission}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-[#f4c430]"
                  >
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Engine
                    </p>
                    <p className="font-semibold text-white">
                      {carData.engine}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 shadow-2xl shadow-black/40">
              <h2
                className="mb-4 text-2xl font-black uppercase tracking-widest text-white"
              >
                Description
              </h2>
              <p className="leading-relaxed text-neutral-300">
                {carData.description}
              </p>
            </div>

            {/* Features */}
            <div className="rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 shadow-2xl shadow-black/40">
              <h2
                className="mb-4 text-2xl font-black uppercase tracking-widest text-white"
              >
                Features
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {carData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div
                      className="h-2 w-2 rounded-full bg-[#f4c430]"
                    ></div>
                    <span className="text-sm font-semibold text-neutral-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Price and Contact */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="sticky top-4 rounded-3xl border border-white/10 bg-[#0B0B0B] p-6 shadow-2xl shadow-black/40">
              <div className="mb-6 text-center">
                <p className="text-3xl font-black tracking-tight text-[#f4c430]">
                  {carData.price}
                </p>
                <div
                  className="mt-3 inline-flex items-center rounded-full border border-[#f4c430]/25 bg-[#f4c430]/10 px-3 py-1 text-sm font-black uppercase tracking-[0.2em] text-[#f4c430]"
                >
                  {carData.condition}
                </div>
              </div>

              {/* Seller Info */}
              <div className="mb-6 border-t border-white/10 pt-6">
                <h3
                  className="mb-3 text-lg font-semibold text-white"
                >
                  Seller Information
                </h3>
                <div className="space-y-2">
                  <p className="font-medium text-white">
                    {carData.sellerName}
                  </p>
                  <p className="flex items-center text-neutral-300">
                    <MapPin className="mr-1 h-4 w-4 text-[#f4c430]" />
                    {carData.city}
                  </p>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="space-y-3">
                <button
                  className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-[#b89014] via-[#f4c430] to-[#ffdf70] py-3 px-4 text-sm font-black uppercase tracking-[0.2em] text-black transition hover:brightness-110 active:scale-[0.99]"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Seller</span>
                </button>
                <button
                  className="flex w-full items-center justify-center space-x-2 rounded-xl border border-white/15 bg-black/40 py-3 px-4 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:border-[#f4c430]/60 hover:text-[#f4c430] active:scale-[0.99]"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 border-t border-white/10 pt-6">
                <div className="space-y-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  <p>All documents verified</p>
                  <p>Test drive available</p>
                  <p>Negotiable price</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CarDetailsPage;
