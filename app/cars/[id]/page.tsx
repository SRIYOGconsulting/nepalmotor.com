import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Car, PhoneCall } from 'lucide-react';
import { getCarListingById } from '@/actions/carListing.action';
import CarListingGallery from '@/components/CarListingGallery';
import CompareListingButton from '@/components/CompareListingButton';

export const dynamic = 'force-dynamic';

type CarListingDetail = {
  _id: unknown;
  source?: string;
  carType?: string;
  variant?: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  location?: string;
  status?: string;
  description?: string;
  images?: Array<{ fileId?: unknown }>;
};

export default async function CarListingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const result = await getCarListingById(id);
  if (!result.success) {
    notFound();
  }

  const car = (result as unknown as { listing: CarListingDetail }).listing;
  if (!car || car.status !== 'available') {
    notFound();
  }

  const photoFileIds =
    Array.isArray(car.images) && car.images.length
      ? car.images.map((img) => (img?.fileId ? String(img.fileId) : '')).filter(Boolean)
      : [];

  const priceText =
    typeof car.price === 'number' && Number.isFinite(car.price)
      ? `NPR ${car.price.toLocaleString('en-US')}`
      : 'Price on request';

  const details = [
    { label: 'Brand', value: car.make || '-' },
    { label: 'Model', value: car.model || '-' },
    { label: 'Year', value: car.year ? String(car.year) : '-' },
    { label: 'Type', value: car.carType || '-' },
    { label: 'Variant', value: car.variant || '-' },
    { label: 'KM Driven', value: typeof car.mileage === 'number' ? `${car.mileage.toLocaleString('en-US')} km` : '-' },
    { label: 'Fuel', value: car.fuelType || '-' },
    { label: 'Transmission', value: car.transmission || '-' },
    { label: 'Location', value: car.location || '-' },
    { label: 'Status', value: car.status || '-' },
    { label: 'Source', value: car.source || '-' },
  ];

  const heroAlt = `${car.year ? `${car.year} ` : ''}${car.make ? `${car.make} ` : ''}${car.model || 'Car'}`.trim() || 'Car';

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <Link href="/" className="text-sm text-[#f4c430] hover:underline">
          ← Back to Home Page
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface p-4 md:p-6">
            {photoFileIds.length ? (
              <CarListingGallery
                photoFileIds={photoFileIds}
                alt={heroAlt}
                fallbackSrc="/MainLogo.png"
              />
            ) : (
              <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                <img src="/MainLogo.png" alt={heroAlt} className="h-full max-h-[520px] w-full object-contain" />
              </div>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="border-b border-line p-6">
              <div className="text-sm uppercase tracking-[0.2em] text-[#f4c430]">Car Details</div>
              <h1 className="mt-3 text-3xl font-black leading-tight">
                {car.title || `${car.make ? `${car.make} ` : ''}${car.model || 'Car'}`}
              </h1>
              <div className="mt-2 text-sm text-muted">
                {car.year ? `Model Year ${car.year}` : 'Car Listing'}
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
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#8fa07a] bg-transparent text-sm font-semibold text-[#8fa07a] transition hover:bg-foreground/5"
                >
                  Book Test Drive <Car className="h-5 w-5" />
                </Link>
                <CompareListingButton listingId={String(car._id)} />
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#dfe5ee] text-sm font-semibold text-[#0b0b0b] transition hover:bg-[#cfd7e3]"
                >
                  Request Callback <PhoneCall className="h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
              {details.map((item) => (
                <div key={item.label} className="border-b border-line px-6 py-4 sm:border-r even:sm:border-r-0">
                  <div className="text-xs uppercase tracking-[0.18em] text-muted">{item.label}</div>
                  <div className="mt-2 text-sm font-medium text-foreground">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="space-y-5 p-6 text-sm text-muted">
              <div>
                <div className="font-semibold text-foreground">Description</div>
                <div className="mt-2 whitespace-pre-line">{car.description || '-'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
