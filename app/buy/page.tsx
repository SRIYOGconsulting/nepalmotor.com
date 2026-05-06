import Link from 'next/link';
import { connectdb } from '@/lib/db';
import { SellCar } from '@/model';

export const dynamic = 'force-dynamic';

type SellCarListItem = {
  _id: string;
  vehicleModel?: string;
  vehicleBrand?: string;
  makeYear?: string | number;
  vehicleType?: string;
  vehicleColor?: string;
  kmDriven?: string | number;
  fuelType?: string;
  transmission?: string;
  expectedValuation?: string | number;
  user?: { city?: string };
  status?: string;
  vehiclePhotoFileId?: string;
  vehiclePhotos?: Array<{ fileId?: string }>;
};

function formatPrice(value?: string | number) {
  if (typeof value === 'number') return `NPR ${value.toLocaleString()}`;
  if (typeof value === 'string' && value.trim()) return value;
  return 'Price on request';
}

export default async function SellCarsPage() {
  await connectdb();
  const docs = (await SellCar.find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .populate('user', 'city')
    .lean()) as unknown as SellCarListItem[];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-6 lg:px-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black uppercase tracking-wide">Used Cars</h1>
          <p className="text-sm text-muted">Browse approved used cars available for sale.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((car) => {
            const id = String(car._id);
            const firstPhotoId = car?.vehiclePhotos?.[0]?.fileId || car?.vehiclePhotoFileId;
            const imgSrc = firstPhotoId ? `/api/sellcar-files/${firstPhotoId}` : '/carTabsImage/Sedan/honda_city.png';
            const title = `${car.vehicleBrand ? `${car.vehicleBrand} ` : ''}${car.vehicleModel || 'Car'}`.trim();
            const subtitle = `${car.makeYear ? `${car.makeYear}` : '-'}${car.vehicleType ? ` • ${car.vehicleType}` : ''}${car.user?.city ? ` • ${car.user.city}` : ''}`;
            const photoCount = Array.isArray(car.vehiclePhotos) ? car.vehiclePhotos.length : 0;

            return (
              <div key={id} className="group overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-[#f4c430]/60">
                <Link href={`/sellcars/${id}`} className="block">
                  <div className="relative aspect-[16/10] w-full bg-surface-2">
                    <img src={imgSrc} alt={title} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      {photoCount > 1 && (
                        <div className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white">{photoCount} Photos</div>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <div className="text-lg font-semibold">{title}</div>
                  <div className="mt-1 text-sm text-muted">{subtitle}</div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted">
                    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2">KM: {car.kmDriven ? `${car.kmDriven}` : '-'}</div>
                    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2">Fuel: {car.fuelType || '-'}</div>
                    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2">Color: {car.vehicleColor || '-'}</div>
                    <div className="rounded-lg border border-line bg-surface-2 px-3 py-2">Trans: {car.transmission || '-'}</div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="text-base font-bold text-[#f4c430]">{formatPrice(car.expectedValuation)}</div>
                    <Link href={`/sellcars/${id}`} className="rounded-lg bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black hover:bg-[#ffdf70]">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {docs.length === 0 && (
            <div className="rounded-2xl border border-line bg-surface-2 p-10 text-center text-sm text-muted sm:col-span-2 lg:col-span-3">
              No used cars available yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
