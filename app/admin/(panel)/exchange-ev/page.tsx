import { getAdminExchangeRequests } from '@/actions/exchangeEV.action';

type AdminUser = {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
};

type AdminSellCar = {
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
};

type AdminExchangeRequest = {
  _id: unknown;
  createdAt?: string;
  newVehicleBrand?: string;
  newVehicleModel?: string;
  newVehiclePriceRange?: string;
  downPayment?: string;
  finance?: string;
  user?: AdminUser;
  sellCar?: AdminSellCar;
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

      <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
        <table className="min-w-[980px] w-full border-collapse">
          <thead className="bg-white/5">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-300">
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Old Vehicle</th>
              <th className="px-4 py-3">Interested EV</th>
              <th className="px-4 py-3">Finance</th>
              <th className="px-4 py-3">Files</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-gray-100">
            {requests.map((r) => {
              const user = r.user || {};
              const sellCar = r.sellCar || {};
              const created = r.createdAt ? new Date(r.createdAt).toLocaleString() : '-';

              const docId = sellCar.vehicleDocumentFileId ? String(sellCar.vehicleDocumentFileId) : '';
              const photoId = sellCar.vehiclePhotoFileId ? String(sellCar.vehiclePhotoFileId) : '';

              return (
                <tr key={String(r._id)}>
                  <td className="px-4 py-3 whitespace-nowrap">{created}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{user.fullName || '-'}</div>
                    <div className="text-xs text-gray-400">{user.phone || '-'}</div>
                    <div className="text-xs text-gray-400">{user.email || '-'}</div>
                    <div className="text-xs text-gray-400">{user.city || '-'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {sellCar.vehicleBrand ? `${sellCar.vehicleBrand} ` : ''}
                      {sellCar.vehicleModel || '-'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {sellCar.vehicleType || '-'} • {sellCar.makeYear || '-'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {sellCar.kmDriven ? `${sellCar.kmDriven} km` : '-'} • {sellCar.vehicleColor || '-'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {sellCar.condition || '-'} • {sellCar.transmission || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {r.newVehicleBrand || '-'} {r.newVehicleModel || ''}
                    </div>
                    <div className="text-xs text-gray-400">{r.newVehiclePriceRange || '-'}</div>
                    <div className="text-xs text-gray-400">{r.downPayment ? `Down: ${r.downPayment}` : '-'}</div>
                  </td>
                  <td className="px-4 py-3">{r.finance || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2">
                      {docId ? (
                        <a className="text-[#f4c430] hover:underline" href={`/api/admin/exchange-files/${docId}`}>
                          Document
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">No document</span>
                      )}
                      {photoId ? (
                        <a className="text-[#f4c430] hover:underline" href={`/api/admin/exchange-files/${photoId}`}>
                          Photo
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">No photo</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                  No requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

