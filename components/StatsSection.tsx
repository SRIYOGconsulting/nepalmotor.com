
"use client"; 

import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

type StatItem = {
  label: string;
  value: number;
  suffix?: string;
  color: string;
};

const stats: StatItem[] = [
  {
    label: "Car Exchanged",
    value: 240,
    color: "text-white",
  },
  {
    label: "Satisfied Clients",
    value: 235,
    color: "text-gradient", 
  },
  {
    label: "Years Experience",
    value: 12,
    suffix: "+",
    color: "text-white",
  },
  {
    label: "Car Types",
    value: 18,
    color: "text-white",
  },
];

const StatsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <div className="w-full py-8 sm:py-12 bg-[#0b0b0b] border-y border-white/10">
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((item) => (
            <div
              key={item.label}
              className="lux-card flex min-h-36 flex-col items-center justify-center p-5 text-center"
            >
              <p className={`text-4xl md:text-5xl font-black ${item.color === 'text-gradient' ? 'text-gradient' : 'text-[#f4c430]'}`}>
               
                {inView ? (
                  <CountUp start={0} end={item.value} duration={2.5} />
                ) : (
                  '0'
                )}
                {item.suffix}
              </p>
              <p className="mt-2 text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
