import Link from 'next/link';
import { getAdminCarListings } from '@/actions/carListing.action';
import CarListingsTable from '@/components/admin/CarListingsTable';

export const dynamic = 'force-dynamic';

type Listing = {
  _id: string;
  title?: string;
  make?: string;
  model?: string;
  year?: number;
  price?: number;
  status?: string;
  images?: Array<{ fileId?: string }>;
};

export default async function AdminCarListingsPage() {
  const result = await getAdminCarListings();

  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Car Listings</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load listings'}</p>
      </div>
    );
  }

  const listings = (result as unknown as { listings: Listing[] }).listings;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Car Listings</h1>
          <p className="mt-1 text-sm text-gray-400">Cars shown on the public /cars page.</p>
        </div>
        <Link href="/admin/car-listings/new" className="rounded-lg bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black">
          Add New
        </Link>
      </div>

      <CarListingsTable listings={listings} />
    </div>
  );
}
