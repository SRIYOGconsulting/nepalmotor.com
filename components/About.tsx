import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

import { connectdb } from '@/lib/db';
import { SellCar } from '@/model';

type SellCarOfDay = {
  _id: unknown;
  vehicleModel?: string;
  vehicleBrand?: string;
  vehicleType?: string;
  makeYear?: string | number;
  vehicleColor?: string;
  kmDriven?: string | number;
  expectedValuation?: string | number;
  features?: string;
  fuelType?: string;
  condition?: string;
  transmission?: string;
  additionalInfo?: string;
  user?: { city?: string };
  vehiclePhotoFileId?: string;
  vehiclePhotos?: Array<{ fileId?: string }>;
};

const FALLBACK_IMAGE_SRC = '/carTabsImage/Sedan/honda_city.png';

function getNepalDateKey(date: Date) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function hashToUint32(input: string) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function buildCarTitle(car: SellCarOfDay) {
  const base = `${car.vehicleBrand ? `${car.vehicleBrand} ` : ''}${car.vehicleModel || 'Car'}`.trim();
  return car.makeYear ? `${base} • ${car.makeYear}` : base;
}

function formatPrice(value?: string | number) {
  if (typeof value === 'number') return `NPR ${value.toLocaleString()}`;
  if (typeof value === 'string' && value.trim()) return value;
  return 'Price on request';
}

function cleanText(value?: string) {
  return (value || '').replace(/\s+/g, ' ').trim();
}

export default async function AboutUs() {
  await connectdb();
  const cars = (await SellCar.find({ status: 'approved' })
    .sort({ _id: 1 })
    .select(
      '_id vehicleBrand vehicleModel vehicleType makeYear vehicleColor kmDriven expectedValuation features fuelType condition transmission additionalInfo user vehiclePhotoFileId vehiclePhotos',
    )
    .populate('user', 'city')
    .lean()) as unknown as SellCarOfDay[];

  const todayKey = getNepalDateKey(new Date());

  if (!cars.length) {
    return (
      <section className="bg-surface-2 w-full border-y border-line">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-black uppercase tracking-wider text-gradient sm:text-5xl">Car of the Day</h2>
            <p className="text-muted">No approved used cars available yet.</p>
            <Link
              href="/sellcars"
              className="lux-button group inline-flex items-center gap-3 rounded-lg px-8 py-4 font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100/20"
              aria-label="View all used cars"
            >
              <span>View Used Cars</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const seed = hashToUint32(todayKey);
  const index = seed % cars.length;
  const car = cars[index];
  const id = String(car._id);
  const firstPhotoId = car?.vehiclePhotos?.[0]?.fileId || car?.vehiclePhotoFileId;
  const imgSrc = firstPhotoId ? `/api/sellcar-files/${firstPhotoId}` : FALLBACK_IMAGE_SRC;
  const title = buildCarTitle(car);
  const subtitle = `${car.vehicleType ? `${car.vehicleType}` : ''}${car.vehicleColor ? ` • ${car.vehicleColor}` : ''}${car.user?.city ? ` • ${car.user.city}` : ''}`.trim();
  const priceText = formatPrice(car.expectedValuation);

  return (
    <section className="bg-surface-2 w-full border-y border-line">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <div className="w-full self-start lg:w-1/2 lg:pr-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-muted">
              <span className="h-2 w-2 rounded-full bg-[#f4c430]" />
              <span>Car of the Day • {todayKey}</span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-wider text-gradient sm:text-5xl">Car of the Day</h2>
            <p className="mt-4 text-2xl font-black text-foreground sm:text-3xl">{title}</p>
            {subtitle ? <p className="mt-2 text-sm font-semibold text-muted">{subtitle}</p> : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-bold text-[#f4c430]">{priceText}</div>
              <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground">
                KM: {car.kmDriven ? `${car.kmDriven}` : '-'}
              </div>
              <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground">
                Fuel: {car.fuelType || '-'}
              </div>
              <div className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-foreground">
                Trans: {car.transmission || '-'}
              </div>
            </div>

            <p className="mt-6 text-muted leading-relaxed">
              A fresh daily spotlight picked from our approved used cars. Browse details, compare, and explore all available listings anytime.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/sellcars/${id}`}
                className="lux-button group inline-flex items-center gap-3 rounded-lg px-8 py-4 font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-100/20"
                aria-label="View car of the day details"
              >
                <span>View Details</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/sellcars" className="text-sm font-semibold text-foreground underline underline-offset-4">
                View all used cars
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl">
              <Image src={imgSrc} alt={title} width={1200} height={750} className="h-auto w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div className="rounded-xl bg-black/60 px-4 py-3 backdrop-blur">
                  <div className="text-sm font-bold text-white">{title}</div>
                  {subtitle ? <div className="mt-1 text-xs text-white/80">{subtitle}</div> : null}
                </div>
                <div className="rounded-xl bg-black/60 px-4 py-3 text-right backdrop-blur">
                  <div className="text-xs font-semibold text-white/80">Today’s price</div>
                  <div className="text-sm font-black text-[#f4c430]">{priceText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
