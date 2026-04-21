// import React from 'react'

// const SingleCarCard = () => {
//   return (
//     <div>SingleCarCard</div>
//   )
// }

// export default SingleCarCard


import React from 'react';
import Image from 'next/image';

type CarCardProps={
    car:CarCardDetails;
}


type CarCardDetails = {
  imageUrl: string;
  year: number;
  make: string;
  model: string;
  variant: string;
  mileage: number;
  transmission: string;
  price: number;
};
//  imageUrl: '/cars/silver-suv.png', // Replace with your image path in the /public folder
//       year: 2022,
//       make: 'Ford',
//       model: 'Everest Sport',
//       variant: '(4WD)',
//       mileage: 91628,
//       transmission: 'Automatic',
//       price: 47990,

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6 text-gray-500 transition-colors group-hover:text-[#f4c430]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
  </svg>
);

const SingleCarCard = ({car}: CarCardProps) => {

  const {imageUrl,
  year,
  make,
  model,
  variant,
  mileage,
  transmission,
  price,}=car
    
  return (
    <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f4c430]/60 hover:shadow-xl hover:shadow-black/40">
      
      {/* Car Image Section */}
      <div className="relative mb-4 h-48 w-full">
        <Image
          src={imageUrl}
          alt={`${year} ${make} ${model}`}
          layout="fill"
          objectFit="contain" 
        />
      </div>

      {/* Car Details Section */}
      <div className="flex flex-grow flex-col justify-between">
        <div>
          {/* Title and Favorite Icon */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-bold line-clamp-1 uppercase tracking-wider text-white">
                {year} {make} {model}
              </h3>
              <p className="text-xs uppercase text-gray-400">{variant}</p>
            </div>
            <button aria-label="Add to favorites" className='cursor-pointer'>
              <HeartIcon />
            </button>
          </div>

          {/* Specs */}
          <p className="mt-3 text-sm text-gray-400">
            {mileage.toLocaleString('en-US')} km · {transmission}
          </p>
        </div>

        {/* Price */}
        <p className="mt-4 text-2xl font-black text-[#f4c430]">
          Rs. {price.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  );
};

export default SingleCarCard;
