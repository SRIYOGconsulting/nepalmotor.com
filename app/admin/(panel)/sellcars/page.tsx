import Link from 'next/link';
import SellCarsTable from '@/components/admin/SellCarsTable';
import { getAdminSellCars } from '@/actions/adminSellCar.action';

export const dynamic = 'force-dynamic';

type Car = {
  _id: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  vehicleType?: string;
  makeYear?: string;
  vehicleColor?: string;
  expectedValuation?: string;
  vehicleDocumentFileId?: string;
  vehicleDocumentFileName?: string;
  vehicleDocumentContentType?: string;
  vehiclePhotoFileId?: string;
  vehiclePhotoFileName?: string;
  vehiclePhotoContentType?: string;
  vehiclePhotos?: Array<{ fileId?: string; filename?: string; contentType?: string; size?: number }>;
  status?: string;
  source?: string;
  flow?: 'inventory' | 'sell-only' | 'exchange';
  createdAt?: string;
  user?: { fullName?: string; phone?: string; city?: string } | null;
};

export default async function AdminSellCarsPage() {
  const result = await getAdminSellCars();

  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Old Cars</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load old cars'}</p>
      </div>
    );
  }

  const serialized = (result as unknown as { cars: Car[] }).cars;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Old Cars</h1>
          <p className="mt-1 text-sm text-gray-400">Inventory and user submissions (sell-only and exchange).</p>
        </div>
        <Link href="/admin/sellcars/new" className="rounded-lg bg-[#f4c430] px-4 py-2 text-sm font-semibold text-black">
          Add New
        </Link>
      </div>

      <SellCarsTable cars={serialized} />
    </div>
  );
}
