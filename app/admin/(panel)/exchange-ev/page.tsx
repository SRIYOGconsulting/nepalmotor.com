import { getAdminExchangeRequests } from '@/actions/exchangeEV.action';
import ExchangeRequestsTable from '@/components/admin/ExchangeRequestsTable';

export const dynamic = 'force-dynamic';

type AdminExchangeRequest = {
  _id: string;
  createdAt?: string;
  newVehicleBrand?: string;
  newVehicleModel?: string;
  newVehiclePriceRange?: string;
  downPayment?: string;
  finance?: string;
  status?: string;
  rejectionReason?: string;
  user?: { fullName?: string; phone?: string; email?: string; city?: string };
  sellCar?: {
    vehicleBrand?: string;
    vehicleModel?: string;
    vehicleType?: string;
    makeYear?: string;
    kmDriven?: string;
    vehicleColor?: string;
    condition?: string;
    transmission?: string;
    vehicleDocumentFileId?: unknown;
    vehiclePhotoFileId?: unknown;
    rejectionReason?: string;
  };
};

export default async function AdminExchangeEVPage() {
  const result = await getAdminExchangeRequests();

  if (!result.success) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Exchange to EV Requests</h1>
        <p className="text-sm text-red-400">{result.message || 'Failed to load requests'}</p>
      </div>
    );
  }

  const requests = (result as { requests: AdminExchangeRequest[] }).requests;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Exchange to EV Requests</h1>
          <p className="mt-1 text-sm text-gray-400">Total: {requests.length}</p>
        </div>
      </div>

      <div className="mt-6">
        <ExchangeRequestsTable requests={requests} />
      </div>
    </div>
  );
}
