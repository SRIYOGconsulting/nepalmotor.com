import { getPublicCarListings } from '@/actions/carListing.action';

type Listing = {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  mileage?: number;
  transmission?: string;
  fuelType?: string;
  location?: string;
  images?: Array<{ fileId?: string }>;
};

export default async function CarsPage() {
  const result = await getPublicCarListings();
  const listings: Listing[] = result.success ? (result as unknown as { listings: Listing[] }).listings : [];

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black uppercase tracking-wide">Cars for Sale</h1>
          <p className="text-sm text-gray-400">Browse available cars added by the admin.</p>
        </div>

        {!result.success && (
          <div className="mt-6 text-sm text-red-400">{(result as unknown as { message?: string }).message || 'Failed to load cars'}</div>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((car) => {
            const firstImageId = car.images?.[0]?.fileId;
            const imgSrc = firstImageId ? `/api/car-files/${firstImageId}` : '/MainLogo.png';
            return (
              <div key={car._id} className="overflow-hidden rounded-2xl border border-white/10 bg-[#111] transition hover:border-[#f4c430]/60">
                <div className="aspect-[16/10] w-full bg-black">
                  <img src={imgSrc} alt={car.title || 'Car'} className="h-full w-full object-cover" />
                </div>
                <div className="p-5">
                  <div className="text-lg font-semibold">{car.title || `${car.make || ''} ${car.model || ''}`.trim() || 'Car'}</div>
                  <div className="mt-1 text-sm text-gray-400">
                    {(car.year ? `${car.year}` : '-') + (car.location ? ` • ${car.location}` : '')}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div className="text-base font-bold text-[#f4c430]">
                      {typeof car.price === 'number' ? `NPR ${car.price.toLocaleString()}` : 'Price on request'}
                    </div>
                    <div className="text-xs text-gray-400">{car.transmission || car.fuelType || ''}</div>
                  </div>
                </div>
              </div>
            );
          })}

          {result.success && listings.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-[#111] p-10 text-center text-sm text-gray-400 sm:col-span-2 lg:col-span-3">
              No cars available yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
