import Link from 'next/link';
import { getAdminEvNewArrivals } from '@/actions/evNewArrivals.action';
import EvNewArrivalsTable from '@/components/admin/EvNewArrivalsTable';

export const dynamic = 'force-dynamic';

type Item = {
  _id: string;
  label?: string;
  priceText?: string;
  href?: string;
  sortOrder?: number;
  imageFileId?: string;
};

export default async function AdminEvNewArrivalsPage() {
  const result = await getAdminEvNewArrivals();

  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">EV New Arrivals</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load items'}</p>
      </div>
    );
  }

  const items = (result as unknown as { items: Item[] }).items;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">EV New Arrivals</h1>
          <p className="mt-1 text-sm text-gray-400">Items shown in the homepage “New Arrivals” section.</p>
        </div>
        <Link href="/admin/ev-new-arrivals/new" className="rounded-lg bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black">
          Add New
        </Link>
      </div>

      <EvNewArrivalsTable items={items} />
    </div>
  );
}
