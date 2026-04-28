import { getAdminSellCarById } from '@/actions/adminSellCar.action';
import EditSellCarForm from '@/components/admin/EditSellCarForm';

type Car = {
  _id: string;
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
  status?: string;
  rejectionReason?: string;
  vehiclePhotoFileId?: string;
  vehicleDocumentFileId?: string;
};

export default async function AdminEditSellCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getAdminSellCarById(id);

  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Edit Old Car</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load old car'}</p>
      </div>
    );
  }

  const car = (result as unknown as { car: Car }).car;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Old Car</h1>
        <p className="mt-1 text-sm text-gray-400">Update old car details, status, and uploads.</p>
      </div>
      <EditSellCarForm car={car} />
    </div>
  );
}

