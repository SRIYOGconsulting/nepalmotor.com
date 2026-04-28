'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
  status?: string;
  rejectionReason?: string;
};

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
  user?: AdminUser;
  sellCar?: AdminSellCar;
};

export default function ExchangeRequestsTable(props: { requests: AdminExchangeRequest[] }) {
  const router = useRouter();
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function approve(id: string) {
    if (!id || submittingId) return;
    setError(null);
    setSubmittingId(id);
    try {
      const res = await fetch(`/api/admin/exchange-ev/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to approve request');
        return;
      }
      router.refresh();
    } catch {
      setError('Failed to approve request');
    } finally {
      setSubmittingId(null);
    }
  }

  async function reject(id: string) {
    if (!id || submittingId) return;
    const reason = window.prompt('Rejection reason');
    if (!reason || !reason.trim()) return;
    setError(null);
    setSubmittingId(id);
    try {
      const res = await fetch(`/api/admin/exchange-ev/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', rejectionReason: reason.trim() }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to reject request');
        return;
      }
      router.refresh();
    } catch {
      setError('Failed to reject request');
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <div className="space-y-3">
      {error && <div className="text-sm text-red-400">{error}</div>}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
        <table className="min-w-[1120px] w-full border-collapse">
          <thead className="bg-white/5">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-300">
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Old Vehicle</th>
              <th className="px-4 py-3">Interested EV</th>
              <th className="px-4 py-3">Finance</th>
              <th className="px-4 py-3">Files</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-gray-100">
            {props.requests.map((r) => {
              const user = r.user || {};
              const sellCar = r.sellCar || {};
              const created = r.createdAt ? new Date(r.createdAt).toLocaleString() : '-';

              const docId = sellCar.vehicleDocumentFileId ? String(sellCar.vehicleDocumentFileId) : '';
              const photoId = sellCar.vehiclePhotoFileId ? String(sellCar.vehiclePhotoFileId) : '';

              const status = r.status || 'pending';
              const isPending = status === 'pending';
              const isRejected = status === 'rejected';

              return (
                <tr key={String(r._id)}>
                  <td className="px-4 py-3 whitespace-nowrap">{created}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{status}</div>
                    {isRejected && (
                      <div className="mt-1 text-xs text-red-300">{r.rejectionReason || sellCar.rejectionReason || '-'}</div>
                    )}
                  </td>
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => approve(String(r._id))}
                        disabled={!isPending || submittingId === String(r._id)}
                        className="cursor-pointer rounded-lg bg-[#f4c430] px-3 py-1 text-xs font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submittingId === String(r._id) ? 'Saving…' : 'Approve'}
                      </button>
                      <button
                        onClick={() => reject(String(r._id))}
                        disabled={!isPending || submittingId === String(r._id)}
                        className="cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {props.requests.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
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

