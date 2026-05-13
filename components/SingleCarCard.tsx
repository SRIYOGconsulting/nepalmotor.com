'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { MAX_COMPARE } from '@/lib/compareConstants';
import { useCompareStore } from '@/store/useCompareStore';

type CarCardProps={
    car:CarCardDetails;
}


type CarCardDetails = {
  _id: string;
  primaryImageUrl: string | null;
  year: number;
  make: string;
  model: string;
  variant: string | null;
  mileage: number | null;
  transmission: string | null;
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
  const addToCompare = useCompareStore((s) => s.add);

  const {_id,
  primaryImageUrl,
  year,
  make,
  model,
  variant,
  mileage,
  transmission,
  price,}=car
    
  return (
    <Link href={`/cars/${_id}`} className="block" aria-label={`View ${year} ${make} ${model}`}>
      <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f4c430]/60 hover:shadow-xl hover:shadow-black/40">
        
        {/* Car Image Section */}
        <div className="relative mb-4 h-48 w-full">
          <button
            type="button"
            aria-label="Add to compare"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const r = addToCompare('car_listing', _id);
              if (r === 'added') toast.success('Added to compare');
              else if (r === 'already') toast('Already in compare');
              else if (r === 'kind_mismatch')
                toast.error(
                  'Compare already has used cars. Clear compare on /compare to add showroom cars.'
                );
              else toast.error(`Compare is full (max ${MAX_COMPARE}).`);
            }}
            className="absolute left-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-sm transition hover:border-[#f4c430] hover:text-[#f4c430]"
          >
            <ArrowLeftRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
          <Image
            src={primaryImageUrl || "/MainLogo.png"}
            alt={`${year} ${make} ${model}`}
            fill
            className="object-contain"
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
                <p className="text-xs uppercase text-gray-400">{variant || ''}</p>
              </div>
            </div>

            {/* Specs */}
            <p className="mt-3 text-sm text-gray-400">
              {typeof mileage === 'number' ? `${mileage.toLocaleString('en-US')} km` : '— km'} · {transmission || '—'}
            </p>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl font-black text-[#f4c430]">
            Rs. {price.toLocaleString('en-US')}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleCarCard;
