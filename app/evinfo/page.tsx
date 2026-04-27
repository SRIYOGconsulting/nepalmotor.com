"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, PiggyBank, Zap, Home, Gift, Cpu } from "lucide-react";

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Cost {
  label: string;
  amount: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ElectricVehicleGuide: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const benefits: Benefit[] = [
    {
      icon: Leaf,
      title: "Environmental Impact",
      description:
        "Zero direct emissions mean cleaner air and reduced carbon footprint. EVs produce 60% fewer emissions than gas cars over their lifetime, even accounting for electricity generation.",
    },
    {
      icon: PiggyBank,
      title: "Lower Operating Costs",
      description:
        "Electricity costs significantly less than gasoline. EVs have fewer moving parts, requiring less maintenance. No oil changes, spark plugs, or transmission repairs needed.",
    },
    {
      icon: Zap,
      title: "Instant Performance",
      description:
        "Electric motors deliver maximum torque instantly, providing smooth and responsive acceleration. Enjoy quiet operation and a premium driving experience.",
    },
    {
      icon: Home,
      title: "Home Charging Convenience",
      description:
        'Wake up every morning with a "full tank" by charging at home overnight. No more gas station visits or waiting in line during busy times.',
    },
    {
      icon: Gift,
      title: "Government Incentives",
      description:
        "Federal tax credits up to $7,500, plus state and local rebates can significantly reduce purchase price. Many areas offer HOV lane access and reduced tolls.",
    },
    {
      icon: Cpu,
      title: "Future-Ready Technology",
      description:
        "Over-the-air updates, advanced driver assistance, and cutting-edge infotainment systems. EVs represent the latest in automotive innovation.",
    },
  ];

  const costs: Cost[] = [
    {
      label: "Average Purchase Price",
      amount: "$45,000",
      description:
        "Before incentives. Federal tax credit can reduce this by up to $7,500, with additional state and local rebates available.",
    },
    {
      label: "Annual Fuel Savings",
      amount: "$1,200",
      description:
        "Based on 12,000 miles/year. Electricity costs about half as much as gasoline per mile driven.",
    },
    {
      label: "Maintenance Savings",
      amount: "$800/year",
      description:
        "No oil changes, fewer moving parts, and regenerative braking reduces wear on brake pads and rotors.",
    },
    {
      label: "Home Charging Setup",
      amount: "$1,500",
      description:
        "One-time cost for Level 2 charging installation. Many utilities offer rebates for home charging equipment.",
    },
    {
      label: "Insurance Premium",
      amount: "+$200/year",
      description:
        "Slightly higher due to vehicle value and repair costs, but many insurers offer EV-specific discounts.",
    },
    {
      label: "Total 5-Year Savings",
      amount: "$8,500",
      description:
        "Combined fuel and maintenance savings over 5 years, making EVs increasingly cost-effective.",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "How far can electric vehicles travel on a single charge?",
      answer:
        "Modern EVs typically range from 200-400 miles per charge. Entry-level models like the Nissan Leaf offer about 226 miles, while premium vehicles like the Mercedes EQS can exceed 450 miles. Range continues to improve with advancing battery technology.",
    },
    {
      question: "How long does it take to charge an electric vehicle?",
      answer:
        "Charging time varies by method: Level 1 (standard outlet) takes 8-20 hours, Level 2 (240V home charger) takes 4-8 hours, and DC fast charging can add 200+ miles in 30 minutes. Most owners charge overnight at home for daily convenience.",
    },
    {
      question: "Are there enough charging stations?",
      answer:
        "The charging network is rapidly expanding. There are over 60,000 public charging stations in the US, with new ones added daily. Tesla's Supercharger network is opening to other brands, and major retailers are installing charging stations at their locations.",
    },
    {
      question: "How long do EV batteries last?",
      answer:
        "EV batteries typically last 8-15 years or 100,000-200,000 miles. Most manufacturers offer 8-10 year warranties on batteries. Studies show batteries retain 80-90% capacity after 8 years, and battery replacement costs are decreasing rapidly.",
    },
    {
      question: "Do EVs work well in cold weather?",
      answer:
        "EVs do lose some range in cold weather (typically 20-30%), but they start reliably and warm up quickly. Many EVs have battery heating systems and can be preheated while plugged in. Cold weather performance improves with each new generation.",
    },
    {
      question: "What happens if I run out of charge?",
      answer:
        "Most EVs provide multiple low-battery warnings and show nearby charging stations. If you do run out, roadside assistance can provide a mobile charge or tow to a charging station. AAA and most manufacturers offer 24/7 EV roadside assistance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Header */}
      <section className="relative overflow-hidden pt-20  px-4 sm:px-8 lg:px-16">
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-12 flex space-x-2 text-sm font-medium w-full items-center justify-center">
            <Link
              href="/"
              className="transition-colors duration-200 flex items-center hover:opacity-80"
              style={{ color: "#008080" }}
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
            <span className="text-gray-400">EV Info</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-5">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #004D40 0%, #008080 50%, #00F3FF 100%)",
                }}
              >
                EV Info Hub
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              We&apos;re here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className=" my-8">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-center text-4xl font-bold text-[#f4c430] mb-12 relative">
            Why Choose Electric?
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-600 mx-auto mt-4 rounded"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-[#111] p-8 rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-2 hover:border-[#f4c430] hover:shadow-2xl border-2 border-transparent"
              >
                <div className="w-15 h-15 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-full flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-teal-800" />
                </div>
                <h3 className="text-teal-800 mb-4 text-xl font-semibold">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Costs Section */}
      <section id="costs" className="py-16">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-center text-4xl font-bold text-[#f4c430] mb-12 relative">
            Cost Breakdown
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-600 mx-auto mt-4 rounded"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {costs.map((cost, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-[#111] rounded-2xl p-8 text-center shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-2 hover:border-[#f4c430] border-2 border-transparent relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-600"></div>
                <div className="text-teal-600 font-semibold mb-4">
                  {cost.label}
                </div>
                <div className="text-4xl font-bold text-teal-800 my-4">
                  {cost.amount}
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {cost.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-center text-4xl font-bold text-[#f4c430] mb-12 relative">
            Frequently Asked Questions
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-teal-600 mx-auto mt-4 rounded"></div>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="animate-on-scroll bg-[#111] rounded-xl overflow-hidden shadow-lg border border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full px-6 py-6 text-left flex justify-between items-center transition-colors duration-300 ${
                    openFAQ === index
                      ? "bg-[#f4c430] text-[#111]"
                      : "bg-[#181818] text-white hover:bg-[#202020]"
                  }`}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span
                    className={`text-xl transition-transform duration-300 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    openFAQ === index ? "max-h-96 py-6 px-6" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ElectricVehicleGuide;
