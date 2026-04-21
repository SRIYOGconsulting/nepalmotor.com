import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Terms of Use | Nepal Motor',
  description: 'Terms and conditions for using the services provided by Nepal Motor.',
};

const TermsOfUsePage = () => {
  return (
    <main className="bg-[#080808] text-white font-sans">
      <div className="container mx-auto max-w-7xl px-6 py-5 md:py-10">
        <div className="mb-12 text-center">
          <nav className="mb-4 flex justify-center space-x-2 text-sm font-medium">
            <Link href="/" className="flex items-center text-teal-600 transition-colors duration-200 hover:text-teal-800">
              <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-400">Terms of Use</span>
          </nav>
          <h1 className="text-4xl font-black text-white md:text-5xl">
            Terms of Use
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-300">
            Welcome to Nepal Motor. By accessing or using our website and services, you agree to comply with and be bound by the following Terms of Use.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          
          <div className="order-2 lg:order-1">
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">1. Acceptance of Terms</h2>
                <ul className="mt-4 space-y-3">
                  <TermListItem>By using Nepal Motor, you confirm that you are at least 18 years old or have parental consent.</TermListItem>
                  <TermListItem>You agree to abide by all applicable laws and regulations.</TermListItem>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">2. Services Provided</h2>
                <ul className="mt-4 space-y-3">
                  <TermListItem>We offer car browsing, test drive booking, vehicle exchange, and access to automotive news and blogs.</TermListItem>
                  <TermListItem>All vehicle information is for informational purposes and may change without notice.</TermListItem>
                  <TermListItem>We do not guarantee the accuracy or completeness of vehicle listings.</TermListItem>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">3. User Responsibilities</h2>
                <ul className="mt-4 space-y-3">
                  <TermListItem>Provide accurate information when using our services.</TermListItem>
                  <TermListItem>Do not misuse, copy, or distribute content from Nepal Motor without permission.</TermListItem>
                  <TermListItem>Do not attempt to disrupt or harm the website or other users.</TermListItem>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">4. Intellectual Property</h2>
                <ul className="mt-4 space-y-3">
                    <TermListItem>All content, logos, and code are the property of Nepal Motor or its licensors.</TermListItem>
                    <TermListItem>You may not reproduce or distribute any part of the website without written consent.</TermListItem>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">5. Limitation of Liability</h2>
                <ul className="mt-4 space-y-3">
                  <TermListItem>Nepal Motor is not liable for any damages resulting from your use of the website.</TermListItem>
                  <TermListItem>All transactions and bookings are subject to verification.</TermListItem>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">6. Changes to Terms</h2>
                <p className="mt-4 text-gray-300">We may update these Terms of Use at any time. Changes will be posted on this page.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[#f4c430]">7. Contact & Support</h2>
                <p className="mt-4 text-gray-300">
                  For questions, contact us at{' '}
                  <a href="mailto:terms@nepalmotor.com" className="font-medium text-teal-600 underline hover:text-teal-800">
                    terms@nepalmotor.com
                  </a>.
                </p>
              </section>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="order-1 lg:order-2">
            <Image
              src="/useofservice.jpg" // The path from your `public` folder
              alt="Illustration of legal documents and a person agreeing to terms"
              width={800}
              height={800}
              className="h-auto w-full rounded-lg object-contain"
              priority
            />
          </div>

        </div>
      </div>
    </main>
  );
};

// Helper component for styled list items, unique to this page
const TermListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start text-gray-300">
    <svg 
      className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-teal-500" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
    <span>{children}</span>
  </li>
);

export default TermsOfUsePage;
