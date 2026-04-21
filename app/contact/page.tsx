import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  const teamMembers = [
    {
      name: "Prakash",
      role: "C.T.O",
      imageUrl: "/teamImage/prakash_upreti.png",
    },
    {
      name: "Niranjan",
      role: "Project Manager",
      imageUrl: "/teamImage/niranjan_sharma.png",
    },
    {
      name: "Madan",
      role: "Information Officer",
      imageUrl: "/teamImage/madan.png",
    },
  ];

  return (
    <div
      style={{ backgroundColor: "#080808" }}
      className="w-full mx-auto min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-8 lg:px-16">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: "#008080" }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"
            style={{ backgroundColor: "#004D40" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-12 flex space-x-2 text-sm font-medium w-full items-center justify-center">
            <a
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
            </a>
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
            <span className="text-neutral-400">Contact</span>
          </nav>

          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #004D40 0%, #008080 50%, #00F3FF 100%)",
                }}
              >
                Contact Us
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              We're here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
            <div
              className="w-32 h-1 mx-auto mt-8 rounded-full"
              style={{ backgroundColor: "#00F3FF" }}
            ></div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <main className="px-4 sm:px-8 lg:px-16 pb-20 mt-5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#111] rounded-3xl shadow-2xl overflow-hidden lg:grid lg:grid-cols-12 border border-white/10">
            {/* Left Column: Form */}
            <div className="p-8 sm:p-12 lg:col-span-7">
              <h2
                className="text-3xl font-bold mb-2 text-white"
              >
                Send us a message
              </h2>
              <p className="text-gray-300 mb-8">
                Fill out the form below and we'll get back to you soon.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {/* Name Input */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#008080" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                    placeholder="Enter your full name"
                    className="py-4 px-4 block w-full text-white bg-[#171717] border border-white/15 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                  />
                </div>

                {/* Mobile Input */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#008080" }}
                  >
                    Mobile *
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-white/15">
                    <span
                      className="inline-flex items-center px-4 text-sm font-medium text-white"
                      style={{ backgroundColor: "#f4c430", color: "#111" }}
                    >
                      +977
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      id="mobile"
                      required
                      placeholder="Enter mobile number"
                      className="flex-1 py-4 px-4 block w-full text-white bg-[#171717] border-0 focus:ring-2 focus:ring-opacity-50"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#008080" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter email address"
                    className="py-4 px-4 block w-full text-white bg-[#171717] border border-white/15 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                  />
                </div>

                {/* Message Textarea */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#008080" }}
                  >
                    Short Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="py-4 px-4 block w-full text-white bg-[#171717] border border-white/15 rounded-xl transition-all duration-200 focus:ring-2 focus:ring-opacity-50 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                {/* Checkbox */}
                <div className="sm:col-span-2 flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-5 w-5 border-gray-300 rounded focus:ring-2 focus:ring-opacity-50"
                      style={{
                        accentColor: "#008080",
                      }}
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-300">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="font-semibold hover:underline transition-all duration-200"
                        style={{ color: "#008080" }}
                      >
                        Terms & Privacy Policy
                      </a>
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-xl text-lg font-bold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-opacity-50"
                    style={{
                      backgroundColor: "#f4c430",
                      boxShadow: "0 10px 25px rgba(244, 196, 48, 0.35)",
                    }}
                  >
                    SEND MESSAGE
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Info & Map */}
            <div
              className="p-8 sm:p-12 lg:col-span-5 lg:rounded-r-3xl"
              style={{ backgroundColor: "#0d0d0d" }}
            >
              <h2
                className="text-3xl font-bold mb-2 text-white"
              >
                Contact Information
              </h2>
              <p className="text-gray-300 mb-10 leading-relaxed">
                Find us at our office, give us a call, or send us an email. We
                are always happy to help.
              </p>

              <dl className="space-y-8">
                {/* Phone Number */}
                <div className="flex items-start bg-[#111] p-4 rounded-xl shadow-sm border border-white/10">
                  <dt className="flex-shrink-0 mt-1">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#008080" }}
                    >
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </dt>
                  <dd className="ml-4">
                    <strong
                      className="block font-bold text-lg mb-1"
                      style={{ color: "#004D40" }}
                    >
                      Phone Number
                    </strong>
                    <span className="text-gray-300">
                      +977-9872354607 / +977-9854673462
                    </span>
                  </dd>
                </div>

                {/* Email */}
                <div className="flex items-start bg-[#111] p-4 rounded-xl shadow-sm border border-white/10">
                  <dt className="flex-shrink-0 mt-1">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#008080" }}
                    >
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </dt>
                  <dd className="ml-4">
                    <strong
                      className="block font-bold text-lg mb-1"
                      style={{ color: "#004D40" }}
                    >
                      E-mail
                    </strong>
                    <span className="text-gray-300">
                      support@nepalmotor.com
                    </span>
                  </dd>
                </div>

                {/* Location */}
                <div className="flex items-start bg-[#111] p-4 rounded-xl shadow-sm border border-white/10">
                  <dt className="flex-shrink-0 mt-1">
                    <div
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: "#008080" }}
                    >
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </dt>
                  <dd className="ml-4">
                    <strong
                      className="block font-bold text-lg mb-1"
                      style={{ color: "#004D40" }}
                    >
                      Location
                    </strong>
                    <span className="text-gray-300">
                      KamalPokhari, Kathmandu 44600
                    </span>
                  </dd>
                </div>
              </dl>

              {/* Map */}
              <div className="mt-10">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.045862252112!2d85.3285706759714!3d27.685023926521743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19973891833d%3A0x626c710488667613!2sUN%20Park!5e0!3m2!1sen!2snp!4v1704285856488!5m2!1sen!2snp"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-8 lg:px-16" id="team">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 text-[#f4c430]"
            >
              Quick Contact
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
              Quick contact the relevant people.
            </p>
            <div
              className="w-32 h-1 mx-auto mt-8 rounded-full"
              style={{ backgroundColor: "#00F3FF" }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((person, index) => (
              <div
                key={person.name}
                className="group relative bg-[#111] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/10 overflow-hidden"
              >
                {/* Decorative background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #00F3FF 0%, transparent 50%, #008080 100%)",
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-white shadow-xl transition-all duration-300 group-hover:shadow-2xl">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        src={person.imageUrl}
                        alt={`Portrait of ${person.name}`}
                      />
                    </div>
                    {/* Floating decoration */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                      style={{ backgroundColor: "#00F3FF" }}
                    ></div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 transition-colors text-white">
                    {person.name}
                  </h3>

                  <p
                    className="text-lg font-semibold mb-8 transition-colors text-[#f4c430]"
                  >
                    {person.role}
                  </p>

                  <button
                    className="relative text-white p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group/button hover:bg-opacity-90"
                    style={{ backgroundColor: "#f4c430", color: "#111" }}
                  >
                    <div className="flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0,0,256,256"
                        className="group-hover/button:rotate-12 transition-transform duration-300"
                      >
                        <g
                          fill="currentColor"
                          fillRule="evenodd"
                          stroke="none"
                          strokeWidth="1"
                          strokeLinecap="butt"
                          strokeLinejoin="miter"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          fontSize="none"
                          textAnchor="none"
                        >
                          <g transform="scale(8,8)">
                            <path d="M24.50391,7.50391c-2.25781,-2.25781 -5.25781,-3.50391 -8.45312,-3.50391c-6.58594,0 -11.94922,5.35938 -11.94922,11.94531c-0.00391,2.10547 0.54688,4.16016 1.59375,5.97266l-1.69531,6.19141l6.33594,-1.66406c1.74219,0.95313 3.71094,1.45313 5.71094,1.45703h0.00391c6.58594,0 11.94531,-5.35937 11.94922,-11.94922c0,-3.19141 -1.24219,-6.19141 -3.49609,-8.44922zM16.05078,25.88281h-0.00391c-1.78125,0 -3.53125,-0.48047 -5.05469,-1.38281l-0.36328,-0.21484l-3.76172,0.98438l1.00391,-3.66406l-0.23437,-0.375c-0.99609,-1.58203 -1.51953,-3.41016 -1.51953,-5.28516c0,-5.47266 4.45703,-9.92578 9.9375,-9.92578c2.65234,0 5.14453,1.03516 7.01953,2.91016c1.875,1.87891 2.90625,4.37109 2.90625,7.02344c0,5.47656 -4.45703,9.92969 -9.92969,9.92969zM21.49609,18.44531c-0.29687,-0.14844 -1.76562,-0.87109 -2.03906,-0.96875c-0.27344,-0.10156 -0.47266,-0.14844 -0.67187,0.14844c-0.19922,0.30078 -0.76953,0.97266 -0.94531,1.17188c-0.17187,0.19531 -0.34766,0.22266 -0.64453,0.07422c-0.30078,-0.14844 -1.26172,-0.46484 -2.40234,-1.48437c-0.88672,-0.78906 -1.48828,-1.76953 -1.66016,-2.06641c-0.17578,-0.30078 -0.01953,-0.46094 0.12891,-0.60937c0.13672,-0.13281 0.30078,-0.34766 0.44922,-0.52344c0.14844,-0.17187 0.19922,-0.29687 0.30078,-0.49609c0.09766,-0.19922 0.04688,-0.375 -0.02734,-0.52344c-0.07422,-0.14844 -0.67187,-1.62109 -0.92187,-2.21875c-0.24219,-0.58203 -0.48828,-0.5 -0.67187,-0.51172c-0.17187,-0.00781 -0.37109,-0.00781 -0.57031,-0.00781c-0.19922,0 -0.52344,0.07422 -0.79687,0.375c-0.27344,0.29688 -1.04297,1.01953 -1.04297,2.48828c0,1.46875 1.07031,2.89063 1.21875,3.08984c0.14844,0.19531 2.10547,3.21094 5.10156,4.50391c0.71094,0.30859 1.26563,0.49219 1.69922,0.62891c0.71484,0.22656 1.36719,0.19531 1.88281,0.12109c0.57422,-0.08594 1.76563,-0.72266 2.01563,-1.42187c0.24609,-0.69531 0.24609,-1.29297 0.17188,-1.41797c-0.07422,-0.125 -0.27344,-0.19922 -0.57422,-0.35156z"></path>
                          </g>
                        </g>
                      </svg>
                    </div>

                    {/* Button shine effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/button:opacity-20 transform -skew-x-12 group-hover/button:animate-pulse"></div>
                  </button>
                </div>

                {/* Card shine effect on hover */}
                <div
                  className="absolute inset-0 rounded-3xl transform -skew-x-12 transition-all duration-700 opacity-0 group-hover:opacity-10"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, #00F3FF, transparent)",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
