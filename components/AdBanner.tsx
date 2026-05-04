
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AdBanner = () => {
  return (
    <section className="w-full border-y border-line bg-surface-2">
      <div className="max-w-7xl mx-auto">
        <div className="py-8 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* 1. Car Image */}
            <div className="flex-shrink-0">
              <Image
                src="/sponsoredadsimages/hyundai-kona-ev.png"
                alt="A teal Hyundai Kona Electric car"
                width={500}
                height={281}
                priority
                className="object-contain"
              />
            </div>

            {/* 2. Car Info & CTA */}
            <div className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left flex-grow lg:mx-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground uppercase">
                Hyundai Kona
              </h2>
              <Link href={'/testdrive'}
                type="button"
                className="lux-button mt-4 px-8 py-2.5 text-base font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4c430]/30"
              >
                Book a Test Drive
              </Link>
            </div>

            {/* 3. Sponsor Info */}
            <div className="mt-6 lg:mt-0 flex flex-col items-center">
              <p className="text-sm text-muted uppercase tracking-widest">Sponsored by</p>
              <div className="mt-2">
                <Image
                  src="/sponsoredadsimages/hyundai-logo.png"
                  alt="Hyundai logo"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider Line */}
        <div className="w-full h-1 bg-[#f4c430]"></div>
      </div>
    </section>
  );
};

export default AdBanner;
