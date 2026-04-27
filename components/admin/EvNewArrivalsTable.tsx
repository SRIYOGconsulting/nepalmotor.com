'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Item = {
  _id: string;
  label?: string;
  priceText?: string;
  href?: string;
  sortOrder?: number;
  imageFileId?: string;
};

export default function EvNewArrivalsTable(props: { items: Item[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function deleteItem(id: string) {
    if (!id) return;
    if (deletingId) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/ev-new-arrivals/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111]">
      <table className="min-w-[980px] w-full border-collapse">
        <thead className="bg-white/5">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-300">
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Label</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Sort</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10 text-sm text-gray-100">
          {props.items.map((it) => (
            <tr key={it._id}>
              <td className="px-4 py-3">
                <div className="h-12 w-20 overflow-hidden rounded-lg border border-white/10 bg-black">
                  {it.imageFileId ? (
                    <img src={`/api/ev-arrival-files/${it.imageFileId}`} alt={it.label || 'EV'} className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="font-semibold">{it.label || '-'}</div>
                <div className="text-xs text-gray-400">{it.href || ''}</div>
              </td>
              <td className="px-4 py-3">{it.priceText || '-'}</td>
              <td className="px-4 py-3">{typeof it.sortOrder === 'number' ? it.sortOrder : '-'}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link className="text-[#f4c430] hover:underline" href={`/admin/ev-new-arrivals/${it._id}/edit`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteItem(it._id)}
                    disabled={deletingId === it._id}
                    className="cursor-pointer rounded-lg border border-white/15 px-3 py-1 text-xs font-semibold text-gray-200 hover:border-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === it._id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {props.items.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-400">
                No EV new arrivals yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

