import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Car, Clock, Users } from 'lucide-react';

const features = [
  // {
  //   icon: Car,
  //   title: 'Cross Country Drive',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   color: 'text-slate-900',
  //   iconBg: 'bg-slate-100',
  //   align: 'left' as const,
  // },
  // {
  //   icon: ShieldCheck,
  //   title: 'No Hidden Charges',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   color: 'text-orange-500', 
  //   iconBg: 'bg-orange-100',
  //   align: 'left' as const,
  // },
  // {
  //   icon: Clock,
  //   title: 'Reserve Anytime',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   color: 'text-slate-900',
  //   iconBg: 'bg-slate-100',
  //   align: 'right' as const,
  // },
  // {
  //   icon: Users,
  //   title: '24/7 Support',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //   color: 'text-slate-900',
  //   iconBg: 'bg-slate-100',
  //   align: 'right' as const,
  // },

  {
  icon: Car,
  title: 'Cross Country Drive',
  description: 'Enjoy seamless travel across Nepal with reliable vehicles suited for hills, highways, and city roads — perfect for both short and long trips.',
  color: 'text-foreground',
  iconBg: 'bg-foreground/5',
  align: 'left' as const,
},
{
  icon: ShieldCheck,
  title: 'No Hidden Charges',
  description: 'We believe in full transparency. What you see is what you pay — no extra charges, no last-minute surprises.',
  color: 'text-[#f4c430]',
  iconBg: 'bg-[#f4c430]/20',
  align: 'left' as const,
},
{
  icon: Clock,
  title: 'Reserve Anytime',
  description: 'Book your vehicle anytime, from anywhere in Nepal. Our online system is always open, 24/7 — even during holidays and festivals.',
  color: 'text-foreground',
  iconBg: 'bg-foreground/5',
  align: 'right' as const,
},
{
  icon: Users,
  title: '24/7 Support',
  description: 'Get round-the-clock customer support from our friendly local team. Whether youre in Kathmandu or a remote area, we’re here to help.',
  color: 'text-foreground',
  iconBg: 'bg-foreground/5',
  align: 'right' as const,
}

];

const WhyChooseUs = () => {
  const leftFeatures = features.filter((f) => f.align === 'left');
  const rightFeatures = features.filter((f) => f.align === 'right');

  return (
    <section className="bg-surface-2 py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-black text-3xl sm:text-4xl text-foreground tracking-normal uppercase">
            WHY CHOOSE US
          </p>
          <h2 className="mt-2  font-semibold tracking-tight text-gradient captialize ">
            Providing Reliable Car Rentals
          </h2>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-8">
          
          {/* Left Features Column */}
          <div className="space-y-12">
            {leftFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${feature.iconBg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-base text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1 order-first lg:order-none flex items-center justify-center">
           
            <div className="relative w-full max-w-xs sm:max-w-sm">
              {/* The Circle Background */}
              <div 
                className="
                  absolute inset-0 z-0  
                  bg-foreground/5 rounded-full
                  aspect-square transform scale-110
                "
              />

              <Image
                src="/whychooseus.png" 
                alt="Jeep car"
                width={500}
                height={500}
                className="relative z-10 w-full pt-20"
              />
            </div>
          </div>

          {/* Right Features Column */}
          <div className="space-y-12">
            {rightFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 lg:flex-row-reverse">
                 <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${feature.iconBg}`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="lg:text-right">
                  <h3 className={`text-lg font-bold ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-base text-muted">
                    {feature.description}
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

export default WhyChooseUs;
