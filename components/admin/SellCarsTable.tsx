'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Car = {
  _id: string;
  vehicleBrand?: string;
  vehicleModel?: string;
  makeYear?: string;
  expectedValuation?: string;
  status?: string;
  source?: string;
  flow?: 'inventory' | 'sell-only' | 'exchange';
  createdAt?: string;
  user?: { fullName?: string; phone?: string; city?: string } | null;
};

export default function SellCarsTable(props: { cars: Car[] }) {
  const router = useRouter();
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function patchStatus(id: string, status: string) {
    if (!id || submittingId) return;
    setError(null);
    setSubmittingId(id);
    try {
      const res = await fetch(`/api/admin/sellcars/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to update status');
        return;
      }
      router.refresh();
    } catch {
      setError('Failed to update status');
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
      const res = await fetch(`/api/admin/sellcars/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected', rejectionReason: reason.trim() }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to reject');
        return;
      }
      router.refresh();
    } catch {
      setError('Failed to reject');
    } finally {
      setSubmittingId(null);
    }
  }

  async function deleteCar(id: string) {
    if (!id || submittingId) return;
    const ok = window.confirm('Delete this old car?');
    if (!ok) return;
    setError(null);
    setSubmittingId(id);
    try {
      const res = await fetch(`/api/admin/sellcars/${id}`, { method: 'DELETE' });
      const data = (await res.json()) as { success?: boolean; message?: string };
      if (!res.ok || !data.success) {
        setError(data.message || 'Failed to delete');
        return;
      }
      router.refresh();
    } catch {
      setError('Failed to delete');
    } finally {
      setSubmittingId(null);
    }
  }

  return (
    <div className="space-y-3">
      {error && <div className="text-sm text-red-400">{error}</div>}

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
        <table className="min-w-[1100px] w-full border-collapse">
          <thead className="bg-white/5">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-300">
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Car</th>
              <th className="px-4 py-3">Seller</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-sm text-gray-100">
            {props.cars.map((c) => {
              const created = c.createdAt ? new Date(c.createdAt).toLocaleString() : '-';
              const seller = c.user || null;
              const disabled = submittingId === c._id;
              return (
                <tr key={c._id}>
                  <td className="px-4 py-3 whitespace-nowrap">{created}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">
                      {c.vehicleBrand ? `${c.vehicleBrand} ` : ''}
                      {c.vehicleModel || '-'}
                    </div>
                    <div className="text-xs text-gray-400">{c.makeYear || '-'}</div>
                    <div className="text-xs text-[#f4c430]">{c.expectedValuation || '-'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold">{seller?.fullName || '-'}</div>
                    <div className="text-xs text-gray-400">{seller?.phone || '-'}</div>
                    <div className="text-xs text-gray-400">{seller?.city || '-'}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold">{c.flow || '-'}</div>
                      <div className="text-xs text-gray-400">{c.source || '-'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{c.status || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link className="text-[#f4c430] hover:underline" href={`/admin/sellcars/${c._id}/edit`}>
                        Edit
                      </Link>
                      <button
                        onClick={() => patchStatus(c._id, 'approved')}
                        disabled={disabled || c.status === 'approved'}
                        className="cursor-pointer rounded-lg bg-[#f4c430] px-3 py-1 text-xs font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reject(c._id)}
                        disabled={disabled}
                        className="cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => patchStatus(c._id, 'sold')}
                        disabled={disabled || c.status === 'sold'}
                        className="cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-[#f4c430] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Mark Sold
                      </button>
                      <button
                        onClick={() => deleteCar(c._id)}
                        disabled={disabled}
                        className="cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {props.cars.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-400">
                  No old cars yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
