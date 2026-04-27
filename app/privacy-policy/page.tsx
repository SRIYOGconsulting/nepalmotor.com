// import React from 'react';


// const PrivacyPolicy = () => (
//   <main className="min-h-screen bg-white flex items-center justify-center py-8 px-2 md:px-8">
//     <section className="max-w-3xl w-full bg-gradient-to-br from-[#e8edee] via-white to-[#e8edee] rounded-2xl shadow-2xl p-6 md:p-12">
//       <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-[#004D40] via-[#008080] to-[#00BCD4] bg-clip-text text-transparent">Privacy Policy</h1>
//       <p className="text-lg text-gray-700 mb-8">At Nepal Motor, your privacy and trust are our top priorities. This Privacy Policy describes how we collect, use, and safeguard your personal information when you use our website and services.</p>

//       <div className="space-y-8">
//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">1. Information We Collect</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li><span className="font-semibold">Personal Data:</span> Name, email address, phone number, city, and vehicle details provided during registration, test drive booking, or vehicle exchange.</li>
//             <li><span className="font-semibold">Usage Data:</span> Pages visited, actions taken, and device/browser information for analytics and improvement.</li>
//             <li><span className="font-semibold">Cookies:</span> We use cookies to enhance your experience and remember your preferences.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">2. How We Use Your Information</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>To provide, maintain, and improve our services.</li>
//             <li>To communicate with you regarding your requests, bookings, and support.</li>
//             <li>To personalize your experience and recommend relevant vehicles or content.</li>
//             <li>For analytics, security, and fraud prevention.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">3. Data Sharing & Disclosure</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>We do <span className="font-semibold">not</span> sell or rent your personal data to third parties.</li>
//             <li>We may share data with trusted partners for service delivery (e.g., payment, hosting) under strict confidentiality.</li>
//             <li>We may disclose information if required by law or to protect our rights and users.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">4. Data Security</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>We use industry-standard security measures to protect your data.</li>
//             <li>Access to your data is restricted to authorized personnel only.</li>
//             <li>We regularly review and update our security practices.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">5. Your Rights & Choices</h2>
//           <ul className="list-disc pl-6 text-gray-700 space-y-2">
//             <li>You may access, update, or delete your personal information at any time by contacting us.</li>
//             <li>You can opt out of marketing communications via the unsubscribe link or by contacting us.</li>
//             <li>For cookie preferences, adjust your browser settings.</li>
//           </ul>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">6. Changes to This Policy</h2>
//           <p className="text-gray-700">We may update this Privacy Policy from time to time. Changes will be posted on this page with the effective date.</p>
//         </section>

//         <section>
//           <h2 className="text-2xl font-bold text-[#008080] mb-2">7. Contact Us</h2>
//           <p className="text-gray-700">If you have any questions or concerns about your privacy, please contact us at <a href="mailto:privacy@nepalmotor.com" className="text-[#008080] underline">privacy@nepalmotor.com</a>.</p>
//         </section>
//       </div>
//     </section>
//   </main>
// );

// export default PrivacyPolicy;


import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// SEO Metadata for the page
export const metadata: Metadata = {
  title: 'Privacy Policy | Nepal Motor',
  description: "Learn how Myrna UI collects and uses your data to improve our services. Your privacy is important to us.",
};

const PrivacyPolicyPage = () => {
  return (
    <main className="bg-[#080808] text-white font-sans w-full">
           <div className="text-center">
                    <nav className="my-8 flex space-x-2 text-sm font-medium w-full items-center justify-center">
                        <Link href="/" className="text-teal-600 hover:text-teal-800 transition-colors duration-200 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                            Home
                        </Link>
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                        <span className="text-gray-400">Privacy Policy</span>
                    </nav>
                    <h1 className="text-5xl text-gradient md:text-6xl font-black mb-4 leading-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-md md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
                         Your privacy is important to us. It is Nepal Motor&apos;s policy to respect
              your privacy regarding any information we may collect from you across
              our website,{' '} <Link
                href="https://nepalmotor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline"
              >
                https://nepalmotor.com
              </Link>
              , and other sites we own and operate.
                    </p>
                </div>

      <div className=" mx-auto max-w-screen-2xl px-2 sm:px-4 md:px-6 lg:px-8 py-5 md:py-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          <div className="order-2 lg:order-1">
            <div className="mt-12 space-y-10">
              <section>
                <h2 className="text-2xl font-bold text-white">
                  Information We Collect
                </h2>
                <p className="mt-4 text-gray-300">
                  We only collect information about you if we have a reason to do so
                  – for example, to provide our Services, to communicate with you,
                  or to make our Services better.
                </p>
                <ul className="mt-5 space-y-4 text-gray-300">
                  <ListItem>
                    <strong className="font-semibold text-gray-100">
                      Personal Information:
                    </strong>{' '}
                    We collect personal information that you provide to us when you
                    use our Services, such as your name, email address, and any
                    other contact information you provide.
                  </ListItem>
                  <ListItem>
                    <strong className="font-semibold text-gray-100">
                      Usage Data:
                    </strong>{' '}
                    We collect information about your interactions with our
                    Services, such as the pages you visit, the links you click,
                    and the search terms you use.
                  </ListItem>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white">
                  How We Use Information
                </h2>
                <p className="mt-4 text-gray-300">
                  We use the information we collect in various ways, including to:
                </p>
                <ul className="mt-5 list-inside list-disc space-y-3 text-gray-300">
                  <li>Provide, operate, and maintain our website.</li>
                  <li>Improve, personalize, and expand our website.</li>
                  <li>Understand and analyze how you use our website.</li>
                  <li>
                    Develop new products, services, features, and functionality.
                  </li>
                  <li>
                    Communicate with you, either directly or through one of our
                    partners, including for customer service, to provide you
                    with updates and other information relating to the website,
                    and for marketing and promotional purposes.
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* ===== Image Column ===== */}
          <div className="order-1 lg:order-2 lg:self-start">
            <Image
              src="/privacy-illustration.jpg" // Path from the 'public' folder
              alt="Illustration of a person at a computer desk"
              width={800} // Original image width
              height={800} // Original image height
              className="h-auto w-full object-contain"
              priority // Load this image first
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start">
    <svg
      className="mr-3 h-6 w-6 flex-shrink-0 text-blue-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <span>{children}</span>
  </li>
);

export default PrivacyPolicyPage;
