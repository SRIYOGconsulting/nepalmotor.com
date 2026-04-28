import mongoose from 'mongoose';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connectdb } from '@/lib/db';
import SellCar from '@/model/sellCar.model';
import SellCarGallery from '@/components/SellCarGallery';
import { ArrowLeftRight, Car, PhoneCall } from 'lucide-react';

export const dynamic = 'force-dynamic';

type SellCarDetail = {
  _id: unknown;
  vehicleModel?: string;
  vehicleBrand?: string;
  vehicleType?: string;
  makeYear?: string;
  vehicleColor?: string;
  kmDriven?: string;
  expectedValuation?: string;
  features?: string;
  fuelType?: string;
  condition?: string;
  accidents?: string;
  accidentInfo?: string;
  transmission?: string;
  additionalInfo?: string;
  vehiclePhotoFileId?: unknown;
  vehicleDocumentFileId?: unknown;
  vehiclePhotos?: Array<{ fileId?: unknown }>;
  user?: { city?: string };
  status?: string;
};

function cleanText(value?: string) {
  if (!value) return '';
  return value.replace(/^__seed__:[^:\n]*:?/, '').trim();
}

export default async function SellCarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  await connectdb();
  const doc = await SellCar.findOne({ _id: id, status: { $in: ['approved', 'sold'] } }).populate('user', 'city').lean();
  if (!doc) {
    notFound();
  }

  const car = JSON.parse(JSON.stringify(doc)) as SellCarDetail;
  const photoFileIds =
    Array.isArray(car.vehiclePhotos) && car.vehiclePhotos.length
      ? car.vehiclePhotos.map((p) => (p?.fileId ? String(p.fileId) : '')).filter(Boolean)
      : car.vehiclePhotoFileId
        ? [String(car.vehiclePhotoFileId)]
        : [];

  const docHref = car.vehicleDocumentFileId ? `/api/sellcar-files/${String(car.vehicleDocumentFileId)}` : '';
  const priceText = car.expectedValuation || 'Price on request';
  const details = [
    { label: 'Brand', value: car.vehicleBrand || '-' },
    { label: 'Model', value: car.vehicleModel || '-' },
    { label: 'Year', value: car.makeYear || '-' },
    { label: 'Type', value: car.vehicleType || '-' },
    { label: 'Color', value: car.vehicleColor || '-' },
    { label: 'KM Driven', value: car.kmDriven ? `${car.kmDriven} km` : '-' },
    { label: 'Fuel', value: car.fuelType || '-' },
    { label: 'Transmission', value: car.transmission || '-' },
    { label: 'Condition', value: car.condition || '-' },
    { label: 'Accidents', value: car.accidents || '-' },
    { label: 'City', value: car.user?.city || '-' },
    { label: 'Status', value: car.status || '-' },
  ];
  const additionalInfo = cleanText(car.additionalInfo);

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <Link href="/sellcars" className="text-sm text-[#f4c430] hover:underline">
          ← Back to cars
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] p-4 md:p-6">
            {photoFileIds.length ? (
              <SellCarGallery
                photoFileIds={photoFileIds}
                alt={car.vehicleModel || 'Car'}
                fallbackSrc="/carTabsImage/Sedan/honda_city.png"
              />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
                <img src="/carTabsImage/Sedan/honda_city.png" alt={car.vehicleModel || 'Car'} className="h-full max-h-[520px] w-full object-cover" />
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
            <div className="border-b border-white/10 p-6">
              <div className="text-sm uppercase tracking-[0.2em] text-[#f4c430]">Car Details</div>
              <h1 className="mt-3 text-3xl font-black leading-tight">
                {car.vehicleBrand ? `${car.vehicleBrand} ` : ''}
                {car.vehicleModel || 'Car'}
              </h1>
              <div className="mt-2 text-sm text-gray-400">
                {car.makeYear ? `Model Year ${car.makeYear}` : 'Used Car'}
              </div>
              <div className="mt-5 text-3xl font-bold text-[#f4c430]">{priceText}</div>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#8fa07a] text-sm font-semibold text-white transition hover:bg-[#7f916a]"
                >
                  Buy Now
                </Link>
                <Link
                  href="/testdrive"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#8fa07a] bg-transparent text-sm font-semibold text-[#8fa07a] transition hover:bg-white/5"
                >
                  Book Test Drive <Car className="h-5 w-5" />
                </Link>
                <Link
                  href="/sellcars"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#dfe5ee] text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#cfd7e3]"
                >
                  Compare <ArrowLeftRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#dfe5ee] text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#cfd7e3]"
                >
                  Request Callback <PhoneCall className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-6">
                {docHref ? (
                  <a
                    className="inline-flex rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-[#f4c430] hover:border-[#f4c430]/50"
                    href={docHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Document
                  </a>
                ) : (
                  <div className="text-sm text-gray-400">No document uploaded</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="border-b border-white/10 px-6 py-4 sm:border-r even:sm:border-r-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-gray-500">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-gray-100">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-5 p-6 text-sm text-gray-200">
              <div>
                <div className="font-semibold text-white">Features</div>
                <div className="mt-2 whitespace-pre-line text-gray-300">{car.features || '-'}</div>
              </div>
              <div>
                <div className="font-semibold text-white">Accident Info</div>
                <div className="mt-2 whitespace-pre-line text-gray-300">{car.accidentInfo || '-'}</div>
              </div>
              <div>
                <div className="font-semibold text-white">Additional Info</div>
                <div className="mt-2 whitespace-pre-line text-gray-300">{additionalInfo || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
