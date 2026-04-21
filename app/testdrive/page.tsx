import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import TestDrivePage from '@/components/TestDriveForm';

const TestDrive = () => {
  return (
    <div className="bg-[#080808]  max-w-screen-2xl mx-auto">
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-cover  bg-center h-72 md:h-96" 
        style={{ backgroundImage: "url('/bookTestDrive.jpg')" }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-90"></div> */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Book A Test Drive</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl text-neutral-200">
            Experience the thrill of driving your dream vehicle. Schedule a test drive with us today and feel the difference.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <TestDrivePage />
    </div>
  );
};

export default TestDrive;
    //   <main className="relative -mt-24 pb-16">
    //     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="bg-white rounded-2xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-12">
            
    //         {/* Left Column: Form */}
    //         <div className="p-6 sm:p-10 lg:col-span-7">
    //           <h2 className="text-3xl font-bold text-gray-900">Schedule a Test Drive</h2>
    //           <form action="#" method="POST" className="mt-8 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
    //             {/* Name Input */}
    //             <div className="sm:col-span-2">
    //               <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name *</label>
    //               <div className="mt-1">
    //                 <input
    //                   type="text"
    //                   name="name"
    //                   id="name"
    //                   autoComplete="name"
    //                   required
    //                   placeholder="Enter your name"
    //                   className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md transition-all"
    //                 />
    //               </div>
    //             </div>

    //             {/* Mobile Input */}
    //             <div>
    //               <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile *</label>
    //               <div className="mt-1 flex rounded-md shadow-sm">
    //                 <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
    //                   +977
    //                 </span>
    //                 <input
    //                   type="tel"
    //                   name="mobile"
    //                   id="mobile"
    //                   required
    //                   placeholder="Enter mobile number"
    //                   className="flex-1 py-3 px-4 block w-full focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-r-md transition-all"
    //                 />
    //               </div>
    //             </div>
                
    //             {/* Email Input */}
    //             <div>
    //               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    //               <div className="mt-1">
    //                 <input
    //                   id="email"
    //                   name="email"
    //                   type="email"
    //                   autoComplete="email"
    //                   placeholder="Enter email address"
    //                   className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md transition-all"
    //                 />
    //               </div>
    //             </div>
                
    //             {/* Message Textarea */}
    //             <div className="sm:col-span-2">
    //               <label htmlFor="message" className="block text-sm font-medium text-gray-700">Short Message</label>
    //               <div className="mt-1">
    //                 <textarea
    //                   id="message"
    //                   name="message"
    //                   rows={4}
    //                   placeholder="Enter your message here"
    //                   className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md transition-all"
    //                 ></textarea>
    //               </div>
    //             </div>
                
    //             {/* Checkbox */}
    //             <div className="sm:col-span-2 flex items-start">
    //                 <div className="flex-shrink-0">
    //                     <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" defaultChecked />
    //                 </div>
    //                 <div className="ml-3">
    //                     <p className="text-sm text-gray-600">I agree to the <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Terms & Privacy Policy</a></p>
    //                 </div>
    //             </div>

    //             {/* Submit Button */}
    //             <div className="sm:col-span-2">
    //               <button
    //                 type="submit"
    //                 className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
    //               >
    //                 SEND MESSAGE
    //               </button>
    //             </div>  
    //           </form>
    //         </div>

    //         {/* Right Column: Contact Info & Map */}
    //         <div className="p-6 sm:p-10 lg:col-span-5 bg-indigo-50 lg:rounded-r-2xl">
    //             <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
    //             <p className="mt-4 text-base text-gray-600">
    //                 Find us at our office, give us a call, or send us an email. We are always happy to help.
    //             </p>
    //             <dl className="mt-10 space-y-8">
    //                 {/* Phone Number */}
    //                 <div className="flex items-start">
    //                     <dt className="flex-shrink-0">
    //                         <Phone className="h-6 w-6 text-indigo-600"/>
    //                     </dt>
    //                     <dd className="ml-3 text-base text-gray-600">
    //                         <strong className="block font-semibold text-gray-900">Phone Number</strong>
    //                         <span>+977-9802347269 / +977-9801038838</span>
    //                     </dd>
    //                 </div>
    //                 {/* Email */}
    //                 <div className="flex items-start">
    //                     <dt className="flex-shrink-0">
    //                         <Mail className="h-6 w-6 text-indigo-600"/>
    //                     </dt>
    //                     <dd className="ml-3 text-base text-gray-600">
    //                         <strong className="block font-semibold text-gray-900">E-mail</strong>
    //                         <span>support@nepalmotor.com</span>
    //                     </dd>
    //                 </div>
    //                 {/* Location */}
    //                 <div className="flex items-start">
    //                     <dt className="flex-shrink-0">
    //                         <MapPin className="h-6 w-6 text-indigo-600"/>
    //                     </dt>
    //                     <dd className="ml-3 text-base text-gray-600">
    //                         <strong className="block font-semibold text-gray-900">Location</strong>
    //                         <span>KamalPokhari, Kathmandu 44600</span>
    //                     </dd>
    //                 </div>
    //             </dl>
    //             {/* Map */}
    //             <div className="mt-10">
    //                 <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
    //                    <iframe 
    //                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.045862252112!2d85.3285706759714!3d27.685023926521743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19973891833d%3A0x626c710488667613!2sUN%20Park!5e0!3m2!1sen!2snp!4v1704285856488!5m2!1sen!2snp" 
    //                     width="100%" 
    //                     height="100%"
    //                     style={{ border: 0 }}
    //                     allowFullScreen={false} 
    //                     loading="lazy" 
    //                     referrerPolicy="no-referrer-when-downgrade">
    //                    </iframe>
    //                 </div>
    //             </div>
    //         </div>
    //       </div>
    //     </div>
    //   </main>
